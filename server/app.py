from flask import Flask, jsonify
import peewee as pw

app = Flask(__name__)

app.config["SECRET_KEY"] = 'megasecretkey'
# app.config["DATABASE_URL"] = "postgres://localhost:5432/passive-frame"

db = pw.PostgresqlDatabase("passive-frame")
db.connect()
# db.create_tables()

@app.route("/")
def home():
    return jsonify(
        message = "hello",
        status = "success"
    )

if __name__ == '__main__':
    app.run()
