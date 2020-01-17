import os

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get(
        'SECRET_KEY') or os.urandom(32)
    S3_BUCKET                 = os.environ.get("S3_BUCKET_NAME")
    S3_REGION                 = os.environ.get("S3_REGION_NAME")
    S3_KEY                    = os.environ.get("S3_PUBLIC_ACCESS_KEY")
    S3_SECRET                 = os.environ.get("S3_SECRET_ACCESS_KEY")
    S3_LOCATION               = f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/'
    JWT_SECRET_KEY            = os.environ.get("JWT_SECRET_KEY")

class ProductionConfig(Config):
    DEBUG = False
    ASSETS_DEBUG = False


class StagingConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    ASSETS_DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    ASSETS_DEBUG = False

class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    ASSETS_DEBUG = True