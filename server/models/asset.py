from models.base_model import BaseModel
from models.organization import Organization
from playhouse.postgres_ext import ArrayField
import peewee as pw

class Asset(BaseModel):
    name = pw.CharField(null=False)
    # number = pw.IntegerField(null=False)
    organization = pw.ForeignKeyField(Organization, null=False, backref='assets')
    discipline = pw.CharField(null=False)
    internal = pw.BooleanField(default=False)
    projects = ArrayField(default=[])
    # (ideas: 
    # -checklist 
    # -3d models 
    # -video
    # -manual
    # -technical paper
    # -ar overlaysss 
    # -product brochures 
    # -drawings / diagrams
    # -Jupyter Notebooks
    # -streamlit scripts
    # -Excel Work Books)