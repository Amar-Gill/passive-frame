from models.base_model import BaseModel
from models.organization import Organization
import peewee as pw

class Project(BaseModel):
    name = pw.CharField(null=False)
    # number = pw.IntegerField(null=False)
    organization = pw.ForeignKeyField(Organization, null=False)
    discipline = pw.CharField(null=False)
    internal = pw.BooleanField(default=False)
    projects = pw.ArrayField(default=[])
    # (ideas: 
    # -checklist 
    # -3d models 
    # -video
    # -manual
    # -technical paper
    # -ar overlaysss 
    # -product brochures 
    # -drawings / diagrams
    # -Hupyter Notebooks
    # -Excel Work Books)