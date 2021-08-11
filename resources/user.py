import base64
from uuid import uuid4

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_restful import Resource, request
from ..models import User

# todo: mr. noori --> register user


# todo: mr. gachpazha --> login


# todo: mr. jafari --> logut
# (must add to __init__.py)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES

jwt_redis_blocklist = redis.StrictRedis(
    host="localhost", port=6379, db=0, decode_responses=True
)


@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None


class LogOutUser(Resource):

    @jwt_required()
    def delete(self):
        jti = get_jwt()["jti"]
        jwt_redis_blocklist.set(jti, "", ex=ACCESS_EXPIRES)
        return {'message': 'user logout successfully'}, 201
