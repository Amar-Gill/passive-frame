from app import app, csrf
from flask_cors import CORS

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# users blueprint
from api.blueprints.users.views import users_api_blueprint
csrf.exempt(users_api_blueprint)
app.register_blueprint(users_api_blueprint, url_prefix='/api/v1/users')

# organizations blueprint
from api.blueprints.organizations.views import organizations_api_blueprint
csrf.exempt(organizations_api_blueprint)
app.register_blueprint(organizations_api_blueprint, url_prefix='/api/v1/organizations')

# projects blueprint
from api.blueprints.projects.views import projects_api_blueprint
csrf.exempt(projects_api_blueprint)
app.register_blueprint(projects_api_blueprint, url_prefix='/api/v1/projects')

# reports blueprint
from api.blueprints.reports.views import reports_api_blueprint
csrf.exempt(reports_api_blueprint)
app.register_blueprint(reports_api_blueprint, url_prefix='/api/v1/reports')

# report_items blueprint
from api.blueprints.report_items.views import report_items_api_blueprint
csrf.exempt(report_items_api_blueprint)
app.register_blueprint(report_items_api_blueprint, url_prefix='/api/v1/report_items')

# sessions blueprint
from api.blueprints.sessions.views import sessions_api_blueprint
csrf.exempt(sessions_api_blueprint)
app.register_blueprint(sessions_api_blueprint, url_prefix='/api/v1/login')

# actions blueprint
from api.blueprints.actions.views import actions_api_blueprint
csrf.exempt(actions_api_blueprint)
app.register_blueprint(actions_api_blueprint, url_prefix='/api/v1/actions')