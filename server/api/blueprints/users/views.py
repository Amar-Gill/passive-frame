from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from models.user import User
from models.organization import Organization

users_api_blueprint = Blueprint("users_api",
                            __name__,
                            template_folder= "templates")


@users_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    username = request.json.get("username", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    organization_id=request.json.get("organization_id", None)

    # check if all data is received
    if (not username) or (not email) or (not password):
        return jsonify(
            message = "Missing data fields. Try again. Organization is optional.",
            status = "Fail"
        )

    # check if username and email unique
    users = User.select()
    usernames = [user.username for user in users]
    if username in usernames:
        return jsonify(
            message = "Username not unique.",
            status = "Fail"
        )

    emails = [user.email for user in users]
    if email in emails:
        return jsonify(
            message = "Email not unique.",
            status = "Fail"
        )

    # check if submitted org_id exists
    orgs = Organization.select()
    org_ids = [org.id for org in orgs]
    if organization_id not in org_ids:
        return jsonify(
            message = "Organization does not exist.",
            status = "Fail"
        )

    # create new user and save to db
    hashed_password = generate_password_hash(password)
    user = User(username=username, email=email, organization_id=organization_id, password=hashed_password)
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

@users_api_blueprint.route("/", methods=["GET"], defaults={"id": None})
@users_api_blueprint.route("/<id>", methods=["GET"])
def index(id):
    # get org name of user if exists
    def get_user_org(user):
        if user.organization:
            return user.organization.name
        else:
            return None
    
    # return info for one user
    if id:
        user = User.get_or_none(User.id == id)
        if user:
            return jsonify(
                id = user.id,
                username = user.username,
                email = user.email,
                organization = get_user_org(user)
            )
        else:
            return jsonify(
                message = "User does not exist",
                status = "Fail"
            )

    # get all users
    users = User.select()

    return jsonify(
        users = [
            {"id": user.id,
            "username": user.username,
            "email": user.email,
            "organization": get_user_org(user)
            }
        for user in users]
    )


