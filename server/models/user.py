from models.base_model import BaseModel
from models.organization import Organization
import peewee as pw

class User(BaseModel):
    username = pw.CharField(unique=True)
    email = pw.CharField(unique=True)
    password = pw.CharField()
    organization = pw.ForeignKeyField(Organization, null=True, default=None)