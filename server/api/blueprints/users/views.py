from flask import Blueprint, jsonify, request
from models.user import User

users_api_blueprint = Blueprint('users_api',
                             __name__,
                             template_folder='templates')

@users_api_blueprint.route("/", methods=["POST"])
def create_user():
    pass