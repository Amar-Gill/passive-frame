from flask import Flask, jsonify
from playhouse.postgres_ext import PostgresqlExtDatabase
from flask_wtf.csrf import CSRFProtect
import peewee as pw

app = Flask("passive-frame")
csrf = CSRFProtect(app)

app.config["SECRET_KEY"] = 'megasecretkey'
# app.config["DATABASE_URL"] = "postgres://localhost:5432/passive-frame"

db = PostgresqlExtDatabase("passive-frame")

# these three lines do not run when in api.__init__.py
from api.blueprints.users.views import users_api_blueprint
csrf.exempt(users_api_blueprint)

app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')

@app.before_request
def before_request():
    db.connect()

@app.route("/")
def home():
    return jsonify(
        message = "hello",
        status = "success"
    )
