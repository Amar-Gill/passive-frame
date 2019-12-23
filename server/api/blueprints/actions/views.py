from flask import Blueprint, jsonify, request
from models.project import Project
from models.report import Report
from models.report_item import ReportItem
from models.action import Action
import datetime

actions_api_blueprint = Blueprint("actions_api",
                                  __name__,
                                  template_folder="templates")


@actions_api_blueprint.route("/", methods=["POST"])
def create():
    # get data
    description = request.json.get("description", None)
    owner = request.json.get("owner", None)
    due_date = request.json.get("dueDate", None)
    report_item_id = request.json.get("reportItemId", None)
    status = request.json.get("status", None)
    # index actions by report_item or project?... report_item for now

    # data validation
    if not report_item_id:
        return jsonify(
            message="missing reportItemId",
            status="Fail"
        )

    # check if report_item_exists
    report_item = ReportItem.get_or_none(ReportItem.id == report_item_id)
    if not report_item:
        return jsonify(
            message="ReportItem does not exist.",
            status="Fail"
        )

    # convert report_item_id to int
    if report_item_id:
        report_item_id = int(report_item_id)

    # calculate action item index
    action_item_count = Action.select().where(
        Action.report_item_id == report_item_id).count()
    action_item_index = action_item_count + 1

    # convert due_date which is bigint to datetimeobject for peewee
    # 1e3 removes millisecond precision
    due_date = datetime.datetime.fromtimestamp(due_date / 1e3)

    # instantiate object and save to db
    action = Action(
        description=description,
        owner=owner,
        due_date=due_date,
        report_item_id=report_item_id,
        action_item_index=action_item_index
    )
    # check status
    if status == "closed":
        action.closed = True

    if action.save():
        return jsonify(
            message="New action created.",
            status="Success",
            # returned action must match report_items.actions response
            action={
                "id": action.id,
                "description": action.description,
                "owner": action.owner,
                "dueDate": datetime.datetime.timestamp(action.due_date)*1000,
                "closed": action.closed,
                "actionItemIndex": action.action_item_index,
                "reportItemId": action.report_item_id
            }
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@actions_api_blueprint.route("/<id>", methods=["PUT"])
def update(id):
    # get action item
    action = Action.get_or_none(Action.id == id)

    if not action:
        return jsonify(
            message=f"No action with id: {id}",
            status="Fail"
        )

    # get data
    description = request.json.get("description", None)
    owner = request.json.get("owner", None)
    due_date = request.json.get("dueDate", None)
    status = request.json.get("status", None)

    # convert due_date which is bigint to datetimeobject for peewee
    # 1e3 removes millisecond precision
    due_date = datetime.datetime.fromtimestamp(due_date / 1e3)

    # resolve if action open or closed
    closed = None
    if status == 'open':
        closed = False
    else:
        closed = True

    if action.description != description:  # allow for empty string
        action.description = description
    if action.owner != owner:
        action.owner = owner
    if due_date and action.due_date != due_date:
        action.due_date = due_date
    if action.closed != closed:
        action.closed = closed

    # save changes to db
    if action.save():
        return jsonify(
            message="Action updated.",
            status="Success"
        )
    else:
        return jsonify(
            message="Something went wrong please try again",
            status="Fail"
        )


@actions_api_blueprint.route("/", methods=["GET"])
def index():
    pass
