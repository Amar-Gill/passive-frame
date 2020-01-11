from models.base_model import BaseModel
from models.report_item import ReportItem
import peewee as pw
from playhouse.hybrid import hybrid_property
from config import Config

class Image(BaseModel):
    path = pw.CharField(null=False)
    caption = pw.CharField(null=True)
    key = pw.IntegerField(null=True) # proj/report/item/XX -- use key. is render order.
    report_item = pw.ForeignKeyField(ReportItem, backref='images', null=True)

    @hybrid_property
    def s3_image_url(self):
        return Config.S3_LOCATION + self.image_path