from uuid import uuid4

from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, request
from base64 import b64encode
from ..models import User, Post as PostModel


class Post(Resource):
    @jwt_required()
    @cross_origin()
    def post(self):
        request_data = {**request.form}
        the_post = PostModel()
        the_post.title = request_data.get('title')
        the_post.description = request_data.get('description')
        the_post.tags = request_data.get('tags').split(',')
        user = User.objects.get(id=get_jwt_identity())
        the_post.user = user
        if request.files.get('image'):
            the_post.image.put(request.files['image'])
        the_post.save()
        return {'message': 'Post created successfully'}, 200
