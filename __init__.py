from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api

from .resources.user import RegisterUser, LogOutUser,LoginUser


def create_app():
    app = Flask(__name__)
    app.secret_key = 'z0=@^1&nb@67ssv1)u9%(&sz@f%6u$*69d1xpswp@50euzcmp_'
    api = Api(app)
    jwt = JWTManager(app)
    api.add_resource(RegisterUser, '/register_user')
    api.add_resource(LoginUser, '/login_user')
    api.add_resource(LogOutUser, '/logout')
    return app
