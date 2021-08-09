from flask import Flask
from flask_restful import Api


def create_app():
    app = Flask(__name__)
    app.secret_key = 'z0=@^1&nb@67ssv1)u9%(&sz@f%6u$*69d1xpswp@50euzcmp_'
    api = Api(app)

    @app.route('/')
    def hello_world():
        return 'Hello World!'

    return app
