# todo: mr. gachpazha --> login
import base64
from uuid import uuid4
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource, request
from ..models import User
import bcrypt
from werkzeug.security import check_password_hash


class LoginUser(Resource):
    def post(self):
        try:
            request_user = {**request.form}
            if request_user.get('username') and request_user.get('password'):
                user = User.objects(username=request_user.get('username'))
                if user and check_password_hash(pwhash=user[0].password, password=request_data.get('password')):
                    return {'access token': create_access_token(str(user[0].id))}, 200
                return {"message": "username or password is incorrect"}, 400
            return {'message': 'invalid input data'}, 400
        except Exception:
            return {'message': 'internal error or invalid input'}, 500

    @jwt_required()
    def get(self):

        user = User.objects.get(id=get_jwt_identity())
        current_user = {}
        for key in {*user}:
            current_user[key] = str(user[key])
        if current_user['image']:
            with open(f'media/users/{current_user["image"]}', 'rb') as f:
                current_user['image'] = str(base64.b64encode(f.read()))[2:-1]
        return current_user
