import boto3, botocore
from config import Config
from flask import abort
import os


s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET
)

def upload_file_to_s3(file, bucket_name, content_type, acl="public-read"):

    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.name,
            ExtraArgs={
                "ACL": acl,
                "ContentType": content_type # file.content_type
            }
        )

    except Exception as e:
        # print("Something Happened: ", e)
        # return abort(500)
        return {
            'upload_status': False,
            'message': f'Something happened: {e}'
        }

    # return "{}{}".format(app.config["S3_LOCATION"], file.filename)
    return {
        'upload_status': True,
        'filename': file.name
    }

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS