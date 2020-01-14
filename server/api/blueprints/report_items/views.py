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
                            # save image in db if upload to s3 success
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

    if not report_item_index:
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

    if subject:
        report_item.subject = subject
    if content:
        report_item.content = content
    if report_item_index:
        report_item.report_item_index = int(report_item_index)

    # save to db
    if report_item.save():
        return jsonify(
            message="Report item updated.",
            status="Success"
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@report_items_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@report_items_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # TODO - update response data to provide reference to images for report item
    # get info for one report item
    if id:
        report_item = ReportItem.get_or_none(ReportItem.id == id)
        if report_item:
            return jsonify(
                id=report_item.id,
                reportId=report_item.report_id,
                projectId=Report.get_or_none(
                    Report.id == report_item.report_id).project_id,
                subject=report_item.subject,
                content=report_item.content,
                reportItemIndex=report_item.report_item_index
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

    return jsonify(
        items=[
            {
                "id": item.id,
                "reportId": item.report_id,
                "projectId": Report.get_or_none(Report.id == item.report_id).project_id,
                "subject": item.subject,
                "content": item.content,
                "reportItemIndex": item.report_item_index
            }
            for item in report_items]
    )


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
