from flask import Blueprint, jsonify, request
from models.report import Report
from models.report_item import ReportItem
from models.action import Action
from models.image import Image
import re
import datetime

# TODO - move function into helpers.py file
def is_positive_int(x):
    regex = r'[\W+A-Za-z]'
    match = re.search(regex, str(x))
    if match:
        return False
    elif int(x) <= 0:
        return False
    else:
        return True

report_items_api_blueprint = Blueprint("report_items_api",
                            __name__,
                            template_folder= "templates")

@report_items_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    subject = request.json.get("subject", None)
    content = request.json.get("content", None)
    report_id = request.json.get("reportId", None)

    # send images in an array from client

    # data validation
    if not report_id:
        return jsonify(
            message = "Missing reportId",
            status = "Fail"
        )

    # calculate report_item_index
    report_item_count = ReportItem.select().where(ReportItem.report_id == report_id).count()
    report_item_index = report_item_count + 1

    # instantiate new_report_item and save to db
    new_report_item = ReportItem(
                        subject = subject,
                        content = content,
                        report_item_index=report_item_index,
                        report_id=report_id
                        )

    # hardcode image saving first???.. wait no report item needs to exist...

    if new_report_item.save():
        # save images here...???
        # save report_item into db...
        # then iterate through images save each.. only then do you return response
        return jsonify(
            message = "New report item created.",
            status = "Success",
            reportItem = {
                "id": new_report_item.id,
                "subject": subject,
                "content": content,
                "reportItemIndex": report_item_index,
                "reportId": report_id,
                "projectId": Report.get_or_none(Report.id == report_id).project_id
            }
        )
    else:
        return jsonify(
            message = "Something went wrong please try again",
            status = "Fail"
        )

@report_items_api_blueprint.route("/<id>", methods=["PUT"])
def update(id):
    # get report_item
    report_item = ReportItem.get_or_none(ReportItem.id == id)

    if not report_item:
        return jsonify(
            message = "ReportItem does not exist.",
            status = "Fail"
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
            message = "Report item updated.",
            status = "Success"
        )
    else:
        return jsonify(
            message = "Something went wrong please try again",
            status = "Fail"
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
                id = report_item.id,
                reportId = report_item.report_id,
                projectId = Report.get_or_none(Report.id == report_item.report_id).project_id,
                subject = report_item.subject,
                content = report_item.content,
                reportItemIndex = report_item.report_item_index
            )
        else:
            return jsonify(
                message = f"No report item with id: {id}",
                status = "Fail"
            )
    # get data
    report_id = request.json.get('reportId', None)

    # data validation
    if not report_id:
        return jsonify(
            message = "Missing reportId",
            status = "Fail"
        )
    
    # query db for report_items
    report_items = ReportItem.select().where(ReportItem.report_id == report_id)

    return jsonify(
        items = [
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
            actions = [
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
            message = f"No report item with id: {id}",
            status = "Fail"
        )