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
    project_name = request.json.get("projectName", None)
    project_number = request.json.get("projectNumber", None)
    organization_id = request.json.get("organizationId", None)

    # check if all data is received
    if (not project_name) or (not organization_id) or (not project_number):
        return jsonify(
            message = "Missing data fields. Try again.",
            status = "Fail"
        )
    
    # check if name unique
    # name to be unique within orgs only
    projects_of_org = Project.select().where(Project.organization_id == organization_id)
    project_names = [project.name for project in projects_of_org]
    if project_name in project_names:
        return jsonify(
            message = "Project name not unique.",
            status = "Fail"
        )

    # check if project number unique
    # project number to be unique within orgs only
    project_numbers = [project.number for project in projects_of_org]
    if project_number in project_numbers:
        return jsonify(
            message = "Project number not unique.",
            status = "Fail"
        )

    # check if organization exists
    organizations = Organization.select()
    organization_ids = [organization.id for organization in organizations]
    if organization_id not in organization_ids:
        return jsonify(
            message = "Organization does not exist.",
            status = "Fail"
        )
    
    # create project and save to db
    project = Project(name=project_name, number=project_number, organization_id=organization_id)
    
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
                project_number = project.number,
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
            "project_number": project.number,
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