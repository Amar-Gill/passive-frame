from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from models.user import User

users_api_blueprint = Blueprint("users_api",
                            __name__,
                            template_folder= "templates")


@users_api_blueprint.route("/", methods=["POST"])
def create():
    data = request.get_json()
    # TODO checks for unique username and if org exists
    hashed_password = generate_password_hash(data["password"])
    user = User(username=data["username"], email=data["email"], organization_id=data["organization_id"], password=hashed_password)
    if user.save():
        return jsonify(
            message = "New user created.",
            status = "Success"
        )
    else:
        return jsonify(
            message = "Something went wrong",
            status = "Fail"
        )

@users_api_blueprint.route("/", methods=["GET"])
def index():
    users = User.select()

    # get org name of user if exists
    def get_user_org(user):
        if user.organization:
            return user.organization.name
        else:
            return None

    return jsonify(
        users = [
            {"id": user.id,
            "username": user.username,
            "organization": get_user_org(user)
            }
        for user in users]
    )


