from models.base_model import BaseModel
from models.report import Report
import datetime
import peewee as pw

# use inheritance for field / h&s reports?
class ReportItem(BaseModel):
    subject = pw.CharField(null=True)
    content = pw.CharField(null=True)
    report_item_index = pw.IntegerField(null=True)
    report = pw.ForeignKeyField(Report, null=False, backref='report_items')