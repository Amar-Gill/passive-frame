from flask import Blueprint, jsonify, request
from models.organization import Organization

projects_api_blueprint = Blueprint("projects_api",
                            __name__,
                            template_folder= "templates")

@projects_api_blueprint.route("/", methods=["POST"])
def create():
    return jsonify(message = "Success")