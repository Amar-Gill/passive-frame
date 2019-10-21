from models.base_model import BaseModel
from models.organization import Organization
import peewee as pw

class Project(BaseModel):
    name = pw.CharField(null=False)
    number = pw.IntegerField(null=False)
    organization = pw.ForeignKeyField(Organization, null=False)