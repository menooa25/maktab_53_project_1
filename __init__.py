from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS
from .blacklist import BLACKLIST

from .resources.user import RegisterUser,LoginUser
from .resources.post import Post, Tags


def create_app():
    app = Flask(__name__)
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.secret_key = 'z0=@^1&nb@67ssv1)u9%(&sz@f%6u$*69d1xpswp@50euzcmp_'
    api = Api(app)
    cors = CORS(app)
    jwt = JWTManager(app)

    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(jwt_header,decrypted_token):
        return decrypted_token['jti'] in BLACKLIST

    api.add_resource(RegisterUser, '/register_user')
    api.add_resource(LoginUser, '/login_user')
    # api.add_resource(UserLogout, '/logout')
    api.add_resource(Post, '/post')
    api.add_resource(Tags,'/tags')
    return app
