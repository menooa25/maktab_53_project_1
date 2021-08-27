import base64
import re
from uuid import uuid4

from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_restful import Resource, request
from werkzeug.security import generate_password_hash, check_password_hash

from ..models import User


# todo: mr. gachpazha --> login
class LoginUser(Resource):
    @cross_origin()
    def post(self):
        try:
            # extracting request data
            request_data = {**request.form}
            if request_data.get('username') and request_data.get('password'):
                # checking user username and password
                user = User.objects(username=request_data.get('username'))
                if user and check_password_hash(pwhash=user[0].password, password=request_data.get('password')):
                    # creating access token and returning it
                    return {'access token': create_access_token(str(user[0].id))}, 200
                return {"message": "Username or password is incorrect"}, 400

            return {'message': 'invalid input data'}, 400
        except Exception:
            return {'message': 'internal error or invalid input'}, 500

    @jwt_required()
    @cross_origin()
    def get(self):
        # getting user data
        user = User.objects.get(id=get_jwt_identity())
        current_user = {}
        for key in {*user}:
            current_user[key] = str(user[key])
        # if the user has image it will convert to base64
        if current_user['image']:
            with open(f'media/users/{current_user["image"]}', 'rb') as f:
                current_user['image'] = str(base64.b64encode(f.read()))[2:-1]
        return current_user

