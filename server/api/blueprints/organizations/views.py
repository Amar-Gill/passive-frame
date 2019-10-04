from flask import Blueprint, jsonify, request
from models.organization import Organization

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