from flask import Blueprint, jsonify, request
from models.organization import Organization
from models.user import User
from models.project import Project

organizations_api_blueprint = Blueprint("organizations_api",
                            __name__,
                            template_folder= "templates")

@organizations_api_blueprint.route("/", methods=["POST"])
def create():
    data = request.get_json()
    # TODO data validation

    org = Organization(name=data["name"])
    if org.save():
        return jsonify(
            message = "New organization created",
            status = "success"
        )
    else:
        return jsonify(
            message = "Something went wrong",
            status = "Fail"
        )


@organizations_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@organizations_api_blueprint.route("/<id>", methods=["GET"])
def index(id):

    # return number of users
    def get_user_count(org):
        users = User.select().where(User.organization_id == org.id)
        return len(users)

    # return info for one org
    if id:
        org = Organization.get_or_none(Organization.id == id)
        if org:
            return jsonify(
                {"id": org.id,
                "name": org.name,
                "user_count": get_user_count(org)}
            )
        else:
            return jsonify(
                message = "Organization does not exist",
                status = "Fail"
            )
    
    # return all orgs
    orgs = Organization.select()

    return jsonify(
        organizations = [
            {"id": org.id,
            "name": org.name,
            "user_count": get_user_count(org)
            }
        for org in orgs]
    )

@organizations_api_blueprint.route("/<id>/employees", methods=["GET"])
def index_users(id):
    org = Organization.get_or_none(Organization.id == id)
    if org:
        users = User.select().where(User.organization_id == id)
        return jsonify(
            employees = [
                {"id": user.id,
                "username": user.username,
                "email": user.email
                }
            for user in users
            ]
        )
    else:
        return jsonify(
            message = "Organization does not exist",
            status = "Fail"
        )


@organizations_api_blueprint.route("/<id>/projects", methods=["GET"])
def index_projects(id):
    org = Organization.get_or_none(Organization.id == id)
    if org:
        projects = Project.select().where(Project.organization_id == id)
        return jsonify(
            projects = [
                {"id": project.id,
                "project_name": project.name
                }
            for project in projects
            ]
        )
    else:
        return jsonify(
            message = "Organization does not exist",
            status = "Fail"
        )