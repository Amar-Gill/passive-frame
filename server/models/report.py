from models.base_model import BaseModel
from models.project import Project
import peewee as pw

# use inheritance for field / h&s reports?
class Report(BaseModel):
    report_type = pw.CharField(null=False)
    project = pw.ForeignKeyField(Project, null=False)