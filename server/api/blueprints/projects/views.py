from flask import Blueprint, jsonify, request
from models.organization import Organization
from models.project import Project
from models.report import Report
from models.report_item import ReportItem
from models.action import Action
from models.image import Image
import datetime


projects_api_blueprint = Blueprint("projects_api",
                                   __name__,
                                   template_folder="templates")


@projects_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    project_name = request.json.get("projectName", None)
    project_number = request.json.get("projectNumber", None)
    organization_id = request.json.get("organizationId", None)

    # check if all data is received
    if (not project_name) or (not organization_id) or (not project_number):
        return jsonify(
            message="Missing data fields. Try again.",
            status="Fail"
        )

    # check if name unique
    # name to be unique within orgs only
    projects_of_org = Project.select().where(
        Project.organization_id == organization_id)
    project_names = [project.name for project in projects_of_org]
    if project_name in project_names:
        return jsonify(
            message="Project name not unique.",
            status="Fail"
        )

    # check if project number unique
    # project number to be unique within orgs only
    project_numbers = [project.number for project in projects_of_org]
    if project_number in project_numbers:
        return jsonify(
            message="Project number not unique.",
            status="Fail"
        )

    # check if organization exists
    organizations = Organization.select()
    organization_ids = [organization.id for organization in organizations]
    if organization_id not in organization_ids:
        return jsonify(
            message="Organization does not exist.",
            status="Fail"
        )

    # create project and save to db
    project = Project(name=project_name, number=project_number,
                      organization_id=organization_id)

    if project.save():
        return jsonify(
            message="New project created.",
            status="Success"
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@projects_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@projects_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # get one instance of project
    if id:
        project = Project.get_or_none(Project.id == id)
        if project:
            return jsonify(
                id=project.id,
                project_name=project.name,
                project_number=project.number,
                organization=project.organization.name
            )
        else:
            return jsonify(
                message="Project does not exist",
                status="Fail"
            )

    # get all projects
    projects = Project.select()

    return jsonify(
        projects=[
            {"id": project.id,
             "project_name": project.name,
             "project_number": project.number,
             "organization": project.organization.name
             }
            for project in projects]
    )


@projects_api_blueprint.route("/<id>", methods=["PUT"])
def update(id):
    project = Project.get_or_none(Project.id == id)

    if project:
        # get data
        project_name = request.json.get("projectName", None)
        project_number = request.json.get("projectNumber", None)
        organization_id = request.json.get("organizationId", None)

        # update the project info
        if project_name and project_name != project.name:
            project.name = project_name
        if project_number and project_number != project.number:
            project.number = project_number
        if organization_id and organization_id != project.organization_id:
            project.organization_id = organization_id

        # save changes to db
        if project.save():
            return jsonify(
                message="Project updated.",
                status="Success"
            )
        else:
            return jsonify(
                message="Something went wrong please try again",
                status="Fail"
            )
    else:
        return jsonify(
            message="Project does not exist",
            status="Fail"
        )


@projects_api_blueprint.route("/<id>/reports", methods=["GET"])
def index_reports(id):
    # use id parameter to query db for project
    project = Project.get_or_none(Project.id == id)

    if project:
        # query db for reports belonging to the project
        reports = Report.select().where(Report.project_id == id)

        # create new list for response
        json_response = []

        # iterate through list of reports and build up response
        for report in reports:
            # for each report, query db for items
            report_items = ReportItem.select().where(ReportItem.report_id == report.id)
            json_response.append(
                {
                    "id": report.id,
                    "report_type": report.report_type,
                    "project_report_index": report.project_report_index,
                    "report_date": datetime.datetime.timestamp(report.report_date)*1000,
                    "project_id": report.project_id,
                    "temperature": report.temperature,
                    "description": report.description,
                    "item_count": report_items.count(),
                    "items": [
                        {
                            "id": report_item.id,
                            "subject": report_item.subject,
                            "content": report_item.content,  # expand content lataz
                            "reportItemIndex": report_item.report_item_index,
                            "reportId": report_item.report_id,
                            "createdAt": datetime.datetime.timestamp(report_item.created_at)*1000,
                            "updatedAt": datetime.datetime.timestamp(report_item.updated_at)*1000,
                            "images": []
                        }

                        for report_item in report_items]
                }
            )

        for report in json_response:
            for item in report["items"]:
                images = Image.select().where(Image.report_item_id == item["id"])
                item["images"] = [
                    {
                        'path': image.path,
                        'caption': image.caption,
                        'key': image.key,
                        's3_image_url': image.s3_image_url
                    }
                for image in images]

        return jsonify(
            reports=json_response
        )
    else:
        return jsonify(
            message=f"No project with id {id}",
            status="Fail"
        )


@projects_api_blueprint.route("/<id>/actions", methods=["GET"])
def index_actions(id):
    # api endpoint for project specific actions
    # therefore query db for actions with project_id == id AND report_item_id == None
    project = Project.get_or_none(Project.id == id)

    if project:
        # query for project specific actions
        actions = Action.select().where((Action.project_id == id) & (Action.report_item_id == None))
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
            message=f"No project with id {id}",
            status="Fail"
        )
