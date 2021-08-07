from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    @app.route('/')
    def hello_world():
        return 'Hello World!'

    return app
