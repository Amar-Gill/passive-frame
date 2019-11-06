from flask import Blueprint, jsonify, request
from models.report import Report
from models.report_item import ReportItem


report_items_api_blueprint = Blueprint("report_items_api",
                            __name__,
                            template_folder= "templates")

@report_items_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    subject = request.json.get("subject", None)
    content = request.json.get("content", None)
    report_id = request.json.get("reportId", None)

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

    if new_report_item.save():
        return jsonify(
            message = "New report item created.",
            status = "Success"
        )
    else:
        return jsonify(
            message = "Something went wrong please try again",
            status = "Fail"
        )

@report_items_api_blueprint.route("/", methods=["GET"])
def index():
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
                "subject": item.subject,
                "content": item.content,
                "reportItemIndex": item.report_item_index
            }
        for item in report_items]
    )