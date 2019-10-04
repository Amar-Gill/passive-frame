from flask import Blueprint, jsonify, request
from models.organization import Organization
from models.project import Project
from models.report import Report


projects_api_blueprint = Blueprint("projects_api",
                            __name__,
                            template_folder= "templates")

@projects_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    data = request.get_json()
    name = data["name"]
    organization_id = data["organization_id"]
    
    # TODO check if name unique and all parameters given
    # name to be unique within orgs only
    
    project = Project(name=name, organization_id=organization_id)
    
    if project.save():
        return jsonify(
            message = "New project created.",
            status = "Success"
        )
    else:
        return jsonify(
            message = "Something went wrong please try again",
            status = "Fail"
        )


@projects_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@projects_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # get one instance of project
    if id:
        project = Project.get_or_none(Project.id == id)
        if project:
            return jsonify(
                id = project.id,
                project_name = project.name,
                organization = project.organization.name
            )
        else:
            return jsonify(
                message = "Project does not exist",
                status = "Fail"
            )
            
    # get all projects
    projects = Project.select()

    return jsonify(
        projects = [
            {"id": project.id,
            "project_name": project.name,
            "organization": project.organization.name
            }
        for project in projects]
    )


@projects_api_blueprint.route("/<id>/reports", methods=["GET"])
def index_reports(id):
    project = Project.get_or_none(Project.id == id)
    if project:
        reports = Report.select().where(Report.project_id == id)
        return jsonify(
            reports = [
                {
                    "report_id": report.id,
                    "report_type": report.report_type,
                    "project_id": report.project_id
                }
            for report in reports]
        )