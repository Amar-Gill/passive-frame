from flask import Blueprint, jsonify, request
from models.organization import Organization

organizations_api_blueprint = Blueprint("organizations_api",
                            __name__,
                            template_folder= "templates")