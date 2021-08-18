from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, request
from uuid import uuid4

from ..models import User, Post as PostModel


class Post(Resource):

    @jwt_required()
    @cross_origin()
    def put(self):
        request_data = {**request.form}
        post_id = request_data.pop('id')
        if request_data.get('tags'):
            request_data['tags'] = request_data.get('tags').split(',')
        user = User.objects.get(id=get_jwt_identity())
        the_post = PostModel.objects.get(user=user, id=post_id)
        for key in request_data:
            the_post[key] = request_data[key]
        if request.files.get('image'):
            the_post.image.put(request.files['image'])
        the_post.save()
        return {'message': 'Post updated successfully'}, 200

    @cross_origin()
    def get(self):
        posts = PostModel.objects.all()
        post_json = [post.json() for post in posts]
        return {'posts': post_json}

    @jwt_required()
    @cross_origin()
    def delete(self):
        _id = request.form.get('id')
        post = PostModel.objects.get(id=_id)
        post.is_active = False
        post.save()
        return {'message': 'post deactivated'}
