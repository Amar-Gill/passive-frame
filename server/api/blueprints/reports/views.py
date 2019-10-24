from flask import Blueprint, jsonify, request
from models.project import Project
from models.report import Report

reports_api_blueprint = Blueprint("reports_api",
                            __name__,
                            template_folder= "templates")

@reports_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    report_type = request.json.get("reportType", None)
    project_id = request.json.get("projectId", None)

    # check if all data is received
    if (not report_type) or (not project_id):
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

    # create report and save to db
    report = Report(report_type=report_type, project_id=project_id, project_report_index=project_report_index)

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
                "project_report_index": report.project_report_index,
                "project_id": report.project_id
            }
        for report in reports]
    )