import os
import config
from flask import Flask, jsonify
from playhouse.postgres_ext import PostgresqlExtDatabase
from flask_wtf.csrf import CSRFProtect
from flask_jwt_extended import JWTManager

app = Flask("passive-frame")
# app.config["DATABASE_URL"] = "postgres://localhost:5432/passive-frame"

csrf = CSRFProtect(app)
jwt = JWTManager(app)

if os.getenv('FLASK_ENV') == 'production':
    app.config.from_object("config.ProductionConfig")
else:
    app.config.from_object("config.DevelopmentConfig")

db = PostgresqlExtDatabase("passive-frame")

@app.before_request
def before_request():
    db.connect()

@app.route("/")
def home():
    return jsonify(
        message = "hello",
        status = "success"
    )
