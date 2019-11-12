from flask import Blueprint, jsonify, request
from models.project import Project
from models.report import Report
from models.report_item import ReportItem
import datetime

reports_api_blueprint = Blueprint("reports_api",
                            __name__,
                            template_folder= "templates")

@reports_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    report_type = request.json.get("reportType", None)
    project_id = request.json.get("projectId", None)
    report_date = request.json.get("reportDate", None)

    # check if all data is received
    if (not report_type) or (not project_id) or(not report_date):
        return jsonify(
            message = "Missing data fields. Try again.",
            status = "Fail"
        )

    # check if project exists
    projects = Project.select()
    project_ids = [project.id for project in projects]
    if project_id not in project_ids:
        return jsonify(
            message = "Project does not exist.",
            status = "Fail"
        )

    # calculate project_report_index
    report_count = Report.select().where((Report.project_id == project_id ) & (Report.report_type == report_type)).count()
    project_report_index = report_count + 1

    # convert report_type which is bigint to datetimeobject for peewee
    # 1e3 removes millisecond precision
    report_date = datetime.datetime.fromtimestamp(report_date / 1e3)

    # create report and save to db
    report = Report(report_type=report_type, project_id=project_id, project_report_index=project_report_index, report_date=report_date)

    if report.save():
        return jsonify(
            message = "New report created.",
            status = "Success"
        )
    else:
        return jsonify(
            message = "Something went wrong please try again",
            status = "Fail"
        )


@reports_api_blueprint.route("/<id>", methods=["PUT"])
def update(id):
    # get report
    report = Report.get_or_none(Report.id == id)

    # check if report exists
    if not report:
        return jsonify(
            message = "Project does not exist.",
            status = "Fail"
        )   

    # get data
    report_type = request.json.get("reportType", None)
    report_date = request.json.get("reportDate", None)

    if report_type:
        report.report_type = report_type
    if report_date:
        report.report_date = report_date

    # do something for project_report_index???

    if report.save():
        return jsonify(
            message="Report updated.",
            status="Success"
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )
    


@reports_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@reports_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # get one instance of report
    if id:
        report = Report.get_or_none(Report.id == id)
        if report:
            return jsonify(
                id = report.id,
                report_type = report.report_type,
                report_date = datetime.datetime.timestamp(report.report_date)*1000,
                project_report_index = report.project_report_index,
                project_id = report.project_id
            )
        else:
            return jsonify(
                message = "Report does not exist",
                status = "Fail"
            )
            

    #get all reports
    reports = Report.select()
    return jsonify(
        reports = [
            {
                "id": report.id,
                "report_type": report.report_type,
                "report_date": datetime.datetime.timestamp(report.report_date)*1000,
                "project_report_index": report.project_report_index,
                "project_id": report.project_id
            }
        for report in reports]
    )


@reports_api_blueprint.route("/<id>/items", methods=["GET"])
def index_items(id):
    report = Report.get_or_none(Report.id == id)
    if report:
        report_items = ReportItem.select().where(ReportItem.report_id == id)
        return jsonify(
            items = [
                {
                    "id": report_item.id,
                    "subject": report_item.subject,
                    "content": report_item.content,
                    "reportItemIndex": report_item.report_item_index,
                    "report_id": report_item.report_id
                }
            for report_item in report_items]
        )
    else:
        return jsonify(
            message = f"No report with id {id}",
            status = "Fail"
        )
        