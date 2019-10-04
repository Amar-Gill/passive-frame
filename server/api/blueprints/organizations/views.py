from flask import Blueprint, jsonify, request
from models.organization import Organization
from models.user import User

organizations_api_blueprint = Blueprint("organizations_api",
                            __name__,
                            template_folder= "templates")

@organizations_api_blueprint.route("/", methods=["POST"])
def create():
    data = request.get_json()
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

@organizations_api_blueprint.route("/", methods=["GET"])
def index():
    orgs = Organization.select()

    # return number of users
    def get_user_count(org):
        users = User.select().where(User.organization_id == org.id)
        return len(users)

    return jsonify(
        organizations = [
            {"id": org.id,
            "name": org.name,
            "user_count": get_user_count(org)
            }
        for org in orgs]
    )