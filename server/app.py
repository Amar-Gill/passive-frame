from flask import Flask, jsonify
from playhouse.postgres_ext import PostgresqlExtDatabase
from flask_wtf.csrf import CSRFProtect
import peewee as pw

app = Flask("passive-frame")
csrf = CSRFProtect(app)

app.config["SECRET_KEY"] = 'megasecretkey'
# app.config["DATABASE_URL"] = "postgres://localhost:5432/passive-frame"

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
