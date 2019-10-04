from models.base_model import BaseModel
import peewee as pw

class Organization(BaseModel):
    name = pw.CharField(unique=True, null=False)