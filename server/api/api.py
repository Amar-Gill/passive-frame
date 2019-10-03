from flask import Flask

app = Flask(__name__)

app.config["SECRET_KEY"] = 'megasecretkey'
app.config["DATABASE_URL"] = "postgres://localhost:5432/passive-frame"