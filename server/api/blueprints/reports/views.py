from flask import Blueprint, jsonify, request
from models.project import Project
from models.report import Report

reports_api_blueprint = Blueprint("reports_api",
                            __name__,
                            template_folder= "templates")

@reports_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    data = request.get_json()
    report_type = data["report_type"]
    project_id = data["project_id"]

    # perform data validations

    # create report and save to db
    report = Report(report_type=report_type, project_id=project_id)

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
                report_id = report.id,
                report_type = report.report_type,
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
                "report_id": report.id,
                "report_type": report.report_type,
                "project_id": report.project_id
            }
        for report in reports]
    )