from models.base_model import BaseModel
from models.project import Project
import datetime
import peewee as pw

# use inheritance for field / h&s reports?
class Report(BaseModel):
    report_type = pw.CharField(null=False)
    report_date = pw.DateTimeField(null=False, default=datetime.datetime.now)
    project_report_index = pw.IntegerField(null = False)
    temperature = pw.IntegerField(null = True)
    description = pw.CharField(null = True)
    project = pw.ForeignKeyField(Project, null=False, backref='reports')