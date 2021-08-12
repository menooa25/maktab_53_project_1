# todo: mr. gachpazha --> login


# todo: mr. jafari --> logut

import base64
import re
from uuid import uuid4

import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource, request

from ..models import User


# todo: mr. noori --> register user

class RegisterUser(Resource):

    @staticmethod
    def password_check(password):

        length_error = len(password) < 8

        digit_error = re.search(r"\d", password) is None

        uppercase_error = re.search(r"[A-Z]", password) is None

        lowercase_error = re.search(r"[a-z]", password) is None

        symbol_error = re.search(r"[ !#$%&'()*+,-./[\\\]^_`{|}~" + r'"]', password) is None

        password_ok = not (length_error or digit_error or uppercase_error or lowercase_error or symbol_error)

        return {
            'password_ok': password_ok,
            'length_error': length_error,
            'digit_error': digit_error,
            'uppercase_error': uppercase_error,
            'lowercase_error': lowercase_error,
            'symbol_error': symbol_error,
        }

    @staticmethod
    def validate_request(request_data):
        valid_keys = ['username', 'first_name', 'last_name', 'phone', 'password', 'email']

        if len(request_data) < 5: return False
        for key in request_data:
            if key not in valid_keys:
                return False
            if key in valid_keys:
                pass
            else:
                return False
        return True

    @staticmethod
    def get_image_extension(image):
        return image.filename[-3:]

    def post(self):

        request_data = {**request.form}

        if self.validate_request(request_data):

            try:
                old_user = User.objects(username=request_data.get('username'))

                if old_user:
                    return {"message": "this username exists"}, 400

                password = request_data['password']
                hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                request_data['password'] = hashed
                image_name = str(uuid4())
                image_fullname = f"{image_name}.{self.get_image_extension(request.files['image'])}"
                request_data['image'] = image_fullname
                user = User(**request_data)
                request.files['image'].save(
                    f'media/users/{image_fullname}')

                user.save()

                return {'message': 'user created successfully'}, 201
            except Exception:
                return {'message': 'internal error happened '}, 500
        return {'message': 'please enter valid data'}, 400
