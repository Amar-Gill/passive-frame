from flask import Blueprint, jsonify, request
from models.user import User
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

sessions_api_blueprint = Blueprint('sessions_api',
                                    __name__,
                                    template_folder='templates')

@sessions_api_blueprint.route('/login', methods = ['POST'])
def create():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # check if user in db
    user = User.get_or_none(User.username == username)
    # check if passwords match
    result = check_password_hash(user.password, password)

    if user and result:
        # return jwt
        auth_token = create_access_token(identity=username)
        return jsonify(
            auth_token=auth_token,
            message = "Succesfully signed in.",
            status = "success",
            user = {
                "id": user.id,
                "username": user.username,
                "organization": user.organization.name
            }), 200
        
    else:
        return jsonify(
            message = "Some error occurred. Please try again.",
            status = "failed"
        )


@sessions_api_blueprint.route("/", methods=["GET"])
def destroy():
    pass