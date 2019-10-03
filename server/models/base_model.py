import os
import peewee as pw
import datetime
from app import db

class BaseModel(pw.Model):
    created_at = pw.DateTimeField(default=datetime.datetime.now)
    updated_at = pw.DateTimeField(default=datetime.datetime.now)

    def save(self, *args, **kwargs):
        self.validate()
        self.updated_at = datetime.datetime.now()
        return super(BaseModel, self).save(*args, **kwargs)

    def validate(self):
        print(
            f"Warning validation method not implemented for {str(type(self))}")
        return True

    class Meta:
        database = db
        legacy_table_names = False