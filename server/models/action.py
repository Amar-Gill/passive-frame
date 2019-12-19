from models.base_model import BaseModel
from models.report_item import ReportItem
import datetime
import peewee as pw

class Action(BaseModel):
    action_item_index = pw.IntegerField(null=True)
    content = pw.CharField(null=True)
    owner = pw.CharField(null=True)
    closed = pw.BooleanField(default = False) # action open by default, so closed=False
    due_date = pw.DateTimeField(null=True)
    report_item = pw.ForeignKeyField(ReportItem, null=True, backref='actions')