from flask import Blueprint, jsonify, request
from models.organization import Organization
from models.project import Project

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