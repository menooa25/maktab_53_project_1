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
                return {"message": "user or password is incorrect"}, 400

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

    @cross_origin()
    def post(self):

        request_data = {**request.form}

        if self.validate_request(request_data):

            try:
                old_user = User.objects(username=request_data.get('username'))

                if old_user:
                    return {"message": "this username exists"}, 400

                password = request_data['password']
                hashed = generate_password_hash(password)
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


# todo: mr. jafari --> logut
# (must add to __init__.py)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES


class UserLogout(Resource):
    @jwt_required
    @cross_origin()
    def post(self):
        jti = get_jwt()['jti']  # jti is "JWT ID", a unique identifier for a JWT.
        BLACKLIST.add(jti)
        return {"message": "Successfully logged out"}, 200
