from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, request
from uuid import uuid4

from ..models import User, Post as PostModel





class Post(Resource):
    @jwt_required()
    @cross_origin()
    def post(self):
        request_data = {**request.form}
        request_data['tags'] = request_data.get('tags').split(',')
        the_post = PostModel(**request_data)
        user = User.objects.get(id=get_jwt_identity())
        the_post.user = user
        return {'message': 'Post created successfully'}, 200