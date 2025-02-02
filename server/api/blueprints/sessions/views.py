from flask import Blueprint, jsonify, request
from models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

sessions_api_blueprint = Blueprint('sessions_api',
                                    __name__,
                                    template_folder='templates')

@sessions_api_blueprint.route('/', methods = ['POST'])
def create():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # check if user in db
    user = User.get_or_none(User.username == username)
    # check if passwords match
    result = None
    if user:
        result = check_password_hash(user.password, password) or None

    if result:
        # create a user object -> matces user object in return value
        user_object = {
            "id": user.id,
            "username": username,
            "email": user.email,
            "organization_name": user.organization.name,
            "organization_id": user.organization.id
        }
        # return jwt with user_object as identity
        auth_token = create_access_token(identity=user_object)
        return jsonify(
            auth_token=auth_token,
            message = "Succesfully signed in.",
            status = "Success",
            user = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "organization_name": user.organization.name,
                "organization_id": user.organization.id
            }), 200
        
    else:
        return jsonify(
            message = "Some error occurred. Please try again.",
            status = "failed"
        )


@sessions_api_blueprint.route("/", methods=["GET"])
def destroy():
    pass