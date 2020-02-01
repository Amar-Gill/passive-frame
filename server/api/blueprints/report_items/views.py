from flask import Blueprint, jsonify, request
from werkzeug.utils import secure_filename
from models.report import Report
from models.report_item import ReportItem
from models.action import Action
from models.image import Image
from helpers.is_positive_int import is_positive_int
from helpers.amazon_s3_helper import *
from config import Config
import datetime
import base64
import tempfile


report_items_api_blueprint = Blueprint("report_items_api",
                                       __name__,
                                       template_folder="templates")


def sort_keys(image):
    return image["key"]


@report_items_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    subject = request.json.get("subject", None)
    content = request.json.get("content", None)
    report_id = request.json.get("reportId", None)
    images = request.json.get("images", None)

    # data validation
    if not report_id:
        return jsonify(
            message="Missing reportId",
            status="Fail"
        )

    # calculate report_item_index
    report_item_count = ReportItem.select().where(
        ReportItem.report_id == report_id).count()
    report_item_index = report_item_count + 1

    # instantiate new_report_item and save to db
    new_report_item = ReportItem(
        subject=subject,
        content=content,
        report_item_index=report_item_index,
        report_id=report_id
    )

    if new_report_item.save():
        # saved images information to return in response
        saved_images = []

        if images:
            # sort images array by key here <- not necessary here
            # images.sort(key=sort_keys)
            # iterate through sorted list and upload to S3
            for image in images:
                # https://code.tutsplus.com/tutorials/base64-encoding-and-decoding-using-python--cms-25588
                # https://stackabuse.com/encoding-and-decoding-base64-strings-in-python/
                imgstring = image["file"] # base 64 encoded string
                content_type = imgstring[imgstring.index(':')+1 : imgstring.index(';')] # obtain content type of encoded file string
                imgstring = imgstring[imgstring.index(',')+1:] # remove data URL declaration
                imgbytes = imgstring.encode('utf-8')
                
                with tempfile.NamedTemporaryFile() as file:
                    file.name = image["path"]
                    decoded_img_data = base64.decodebytes(imgbytes)
                    file.write(decoded_img_data)

                    # check if a file was included in object
                    if file.name == "":
                        saved_images.append(
                            {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})
                    # upload to s3
                    elif file and allowed_file(file.name):
                        file.name = secure_filename(file.name)
                        file.seek(0)
                        output = upload_file_to_s3(file, f'{Config.S3_BUCKET}', content_type, f'report-item-{new_report_item.id}')
                        if output["upload_status"]:
                            # save image in db if upload to s3 successful
                            new_image = Image(
                                path=str(output["filename"]),
                                key=image["key"],
                                caption=image["caption"],
                                report_item_id=new_report_item.id
                            )
                            if new_image.save():
                                saved_images.append(
                                    {"key": image["key"], "status": "Success", "message": "Image uploaded to S3 successfully."})
                        else:
                            # do not save into db if s3 upload fails
                            saved_images.append(
                                {"key": image["key"], "status": "Fail", "message": output["message"]})
                    else:
                        saved_images.append(
                            {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})

        return jsonify(
            message="New report item created.",
            status="Success",
            reportItem={
                "id": new_report_item.id,
                "subject": subject,
                "content": content,
                "reportItemIndex": report_item_index,
                "reportId": report_id,
                "projectId": Report.get_or_none(Report.id == report_id).project_id,
                "savedImages": saved_images
            }
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@report_items_api_blueprint.route("/<id>", methods=["PUT"])
def update(id):
    # get report_item
    report_item = ReportItem.get_or_none(ReportItem.id == id)

    if not report_item:
        return jsonify(
            message="ReportItem does not exist.",
            status="Fail"
        )

    # get data
    subject = request.json.get("subject", None)
    content = request.json.get("content", None)
    report_item_index = request.json.get("reportItemIndex", None)
    images = request.json.get("images", None)

    # breakpoint()

    # alpha = beta + gamma

    if not report_item_index: # case for empty string
        return jsonify(
            message="Report Item Index must be a positive integer",
            status="Fail"
        )

    # validate report item index is a positive int
    if not is_positive_int(report_item_index):
        return jsonify(
            message="Report Item Index must be a positive integer",
            status="Fail"
        )

    if subject and subject != report_item.subject:
        report_item.subject = subject
    if content and content != report_item.content:
        report_item.content = content
    if report_item_index and report_item.report_item_index:
        report_item.report_item_index = int(report_item_index)

    # save to db
    if report_item.save():
        saved_images =[]
        new_image_state = [] # generate new images state for form as a return value for ui
        # handle images here. image interface with react State:
        # imageDict = {
        #     "key" : image.key (db field),
        #     "path": image.path (db field),
        #     "caption": image.caption (db field),
        #     "file": image.file or None, (base64 encoded string)
        #     "s3_image_url": image.s3_image_url or None, (hybrid property of model)
        #     "saved": True or False or "changed" (False means new upload.)
        # }
        # if images array present
        if images:
            for image in images:
                # switch(image_is_saved) (values: True, False, or 'changed'):
                if image["saved"]:
                    # case 'changed': caption or image changed, or both
                    if image["saved"] == "changed":
                        # check case of caption only changed
                        if not image["file"]:
                            updated_image = Image.get((Image.report_item_id == report_item.id) & (Image.key == image["key"]))
                            updated_image.caption = image["caption"]
                            if updated_image.save():
                                saved_images.append({"key": image["key"], "status": "Success", "message": "Caption updated."})
                                new_image_state.append(
                                    {
                                        "key": image["key"],
                                        "file": None,
                                        "caption": image["caption"],
                                        "path": image["path"],
                                        "s3_image_url": image["s3_image_url"],
                                        "saved": True,
                                        "fromClient": False
                                    } # yes makes sense.
                                )
                        # case for new photo. image file means encoded file string is present because file changed
                        if image["file"]:
                            # decode string
                            imgstring = image["file"] # base 64 encoded string
                            content_type = imgstring[imgstring.index(':')+1 : imgstring.index(';')] # obtain content type of encoded file string
                            imgstring = imgstring[imgstring.index(',')+1:] # remove data URL declaration
                            imgbytes = imgstring.encode('utf-8')
                            
                            with tempfile.NamedTemporaryFile() as file:
                                file.name = image["path"]
                                decoded_img_data = base64.decodebytes(imgbytes)
                                file.write(decoded_img_data)

                                # check if a file was included in object
                                if file.name == "":
                                    saved_images.append(
                                        {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})
                                # upload to s3
                                elif file and allowed_file(file.name):
                                    file.name = secure_filename(file.name)
                                    file.seek(0)
                                    output = upload_file_to_s3(file, f'{Config.S3_BUCKET}', content_type, f'report-item-{report_item.id}')
                                    if output["upload_status"]:
                                        # save image in db if upload to s3 successful
                                        new_image = Image(
                                            path=str(output["filename"]),
                                            key=image["key"],
                                            caption=image["caption"],
                                            report_item_id=report_item.id
                                        )
                                        if new_image.save():
                                            
                                            saved_images.append(
                                                {"key": image["key"], "status": "Success", "message": "Image uploaded to S3 successfully."})
                                            
                                            # set old image key to None. set caption to ''
                                            prev_image = Image.get((Image.report_item_id == report_item.id) & (Image.key == image["key"]) & (Image.id != new_image.id))
                                            prev_image.key = None
                                            prev_image.caption = ''
                                            prev_image.save()

                                            new_image_state.append(
                                                {
                                                    "key": image["key"],
                                                    "file": None,
                                                    "path": image["path"],
                                                    "caption": image["caption"],
                                                    "s3_image_url": new_image.s3_image_url,
                                                    "saved": True,
                                                    "fromClient": False
                                                } # yes makes sense
                                            )
                                    else:
                                        # do not save into db if s3 upload fails
                                        saved_images.append(
                                            {"key": image["key"], "status": "Fail", "message": output["message"]})
                                        # if s3 upload fails, return same object for state
                                        # update fromClient flag
                                        image["fromClient"] = False
                                        new_image_state.append(image)
                                        # image object should be as follows:

                                        # imageDict = {
                                        #     "key" : image.key (db field),
                                        #     "path": user input file name,
                                        #     "caption": user input caption,
                                        #     "file": user uploaded file (base64 encoded string)
                                        #     "s3_image_url": None - because saved image being changed
                                        #     "saved": "changed"
                                        # }

                                else:
                                    # somehow a non image file included. code shouldn't reach here. controlled at client side.
                                    saved_images.append(
                                        {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})
                                    image["fromClient"] = False
                                    new_image_state.append(image)
                    # case true: do nothing
                    else:
                        saved_images.append({"key": image["key"], "status": "Success", "message": "No change to image"})
                        image["fromClient"] = False
                        new_image_state.append(image)
                        # imageDict = {
                        #     "key" : image.key (db field),
                        #     "path": image.path,
                        #     "caption": image.caption,
                        #     "file": None,
                        #     "s3_image_url": image.s3_image_url
                        #     "saved": True # no changes
                        # } yes makes sense.
                else:
                    # case false: save upload to s3 then save to db
                    # new image and new key. important - NEW image.
                    # get the file and decode
                    imgstring = image["file"] # base 64 encoded string
                    content_type = imgstring[imgstring.index(':')+1 : imgstring.index(';')] # obtain content type of encoded file string
                    imgstring = imgstring[imgstring.index(',')+1:] # remove data URL declaration
                    imgbytes = imgstring.encode('utf-8')
                    
                    with tempfile.NamedTemporaryFile() as file:
                        file.name = image["path"]
                        decoded_img_data = base64.decodebytes(imgbytes)
                        file.write(decoded_img_data)

                        # check if a file was included in object
                        if file.name == "":
                            saved_images.append(
                                {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})
                            new_image_state.append(image)
                        # upload to s3
                        elif file and allowed_file(file.name):
                            file.name = secure_filename(file.name)
                            file.seek(0)
                            output = upload_file_to_s3(file, f'{Config.S3_BUCKET}', content_type, f'report-item-{report_item.id}')
                            if output["upload_status"]:
                                # save image in db if upload to s3 successful
                                new_image = Image(
                                    path=str(output["filename"]),
                                    key=image["key"],
                                    caption=image["caption"],
                                    report_item_id=report_item.id
                                )
                                if new_image.save():
                                    saved_images.append(
                                        {"key": image["key"], "status": "Success", "message": "Image uploaded to S3 successfully."})
                                    new_image_state.append(
                                        {
                                            "key": new_image.key, # same as image["key"]
                                            "file": None,
                                            "path": new_image.path,
                                            "caption": new_image.caption,
                                            "s3_image_url": new_image.s3_image_url,
                                            "saved": True,
                                            "fromClient": False
                                        } # yes makes sense
                                    )
                            else:
                                # do not save into db if s3 upload fails
                                saved_images.append(
                                    {"key": image["key"], "status": "Fail", "message": output["message"]})
                                image["fromClient"] = False
                                new_image_state.append(image)
                                # imageDict = {
                                #     "key" : image["key"] a new key,
                                #     "path": image["path"] user inputted file name,
                                #     "caption": image["caption"] user inputted caption,
                                #     "file": user uploaded file (base64 encoded string). decode at client.
                                #     "s3_image_url": None - because s3 upload failed
                                #     "saved": False
                                # } makes sense
                        else:
                            # somehow a non image file included. code shouldn't reach here. controlled at client side.
                            saved_images.append(
                                {"key": image["key"], "status": "Fail", "message": "Must upload an image file."})
                            image["fromClient"] = False
                            new_image_state.append(image)
                                # imageDict = {
                                #     "key" : image["key"] a new key,
                                #     "path": image["path"] user inputted file name,
                                #     "caption": image["caption"] user inputted caption,
                                #     "file": user uploaded file (base64 encoded string). decode at client.
                                #     "s3_image_url": None - because s3 upload failed
                                #     "saved": False
                                # } makes sense

        # maybe sort image here before returning response? no need sorted on client side.         
        return jsonify(
            message="Report item updated.",
            status="Success",
            reportItem={
                "id": id,
                "subject": subject,
                "content": content,
                "reportItemIndex": report_item_index,
                "reportId": report_item.report_id,
                "projectId": Report.get_or_none(Report.id == report_item.report_id).project_id,
                "savedImages": saved_images,
                "newImageState": new_image_state
            }
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@report_items_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@report_items_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # get info for one report item
    if id:
        report_item = ReportItem.get_or_none(ReportItem.id == id)
        if report_item:
            images = Image.select().where((Image.report_item_id == id) & (Image.key != None)) # and where key != None
            return jsonify(
                id=report_item.id,
                reportId=report_item.report_id,
                projectId=Report.get_or_none(
                    Report.id == report_item.report_id).project_id,
                subject=report_item.subject,
                content=report_item.content,
                reportItemIndex=report_item.report_item_index,
                images=[
                    {
                        'path': image.path,
                        'caption': image.caption,
                        'key': image.key,
                        's3_image_url': image.s3_image_url,
                        'file': None,
                        'saved': True,
                        'fromClient': False
                    }
                for image in images]
            )
        else:
            return jsonify(
                message=f"No report item with id: {id}",
                status="Fail"
            )
    # get data
    report_id = request.json.get('reportId', None)

    # data validation
    if not report_id:
        return jsonify(
            message="Missing reportId",
            status="Fail"
        )

    # query db for report_items
    report_items = ReportItem.select().where(ReportItem.report_id == report_id)

    # return jsonify(
    #     items=[
    #         {
    #             "id": item.id,
    #             "reportId": item.report_id,
    #             "projectId": Report.get_or_none(Report.id == item.report_id).project_id,
    #             "subject": item.subject,
    #             "content": item.content,
    #             "reportItemIndex": item.report_item_index
    #         }
    #         for item in report_items]
    # )

    json_response =[]

    for item in report_items:
        images = Image.select().where((Image.report_item_id == item.id) & (Image.key != None))
        actions = Action.select().where(Action.report_item_id == item.id)
        json_response.append(
            {
                "id": item.id,
                "reportId": item.report_id,
                "projectId": Report.get_or_none(Report.id == item.report_id).project_id,
                "subject": item.subject,
                "content": item.content,
                "reportItemIndex": item.report_item_index,
                "images": [
                    {
                        'path': image.path,
                        'caption': image.caption,
                        'key': image.key,
                        's3_image_url': image.s3_image_url,
                        'file': None,
                        'saved': True,
                        'fromClient': False
                    }
                for image in images],
                "actions": [
                    {
                        "id": action.id,
                        "description": action.description,
                        "owner": action.owner,
                        "dueDate": datetime.datetime.timestamp(action.due_date)*1000,
                        "closed": action.closed,
                        "actionItemIndex": action.action_item_index,
                        "reportItemId": action.report_item_id,
                        "projectId": action.project_id
                    }
                for action in actions]
            }
        )
    
    return jsonify(items=json_response)


@report_items_api_blueprint.route("<id>/actions", methods=["GET"])
def index_actions(id):
    # get report_item
    report_item = ReportItem.get_or_none(ReportItem.id == id)

    if report_item:
        # get actions for that report_item
        actions = Action.select().where(Action.report_item_id == id)
        return jsonify(
            actions=[
                {
                    "id": action.id,
                    "description": action.description,
                    "owner": action.owner,
                    "dueDate": datetime.datetime.timestamp(action.due_date)*1000,
                    "closed": action.closed,
                    "actionItemIndex": action.action_item_index,
                    "reportItemId": action.report_item_id,
                    "projectId": action.project_id
                }
                for action in actions]
        )
    else:
        return jsonify(
            message=f"No report item with id: {id}",
            status="Fail"
        )
