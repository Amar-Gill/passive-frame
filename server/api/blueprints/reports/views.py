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
