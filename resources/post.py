from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, request
from uuid import uuid4

from ..models import User, Post as PostModel


# jaafari


class PostList(Resource):

    @staticmethod
    def get_image_extension(image):
        return image.filename[-3:]

    @jwt_required()
    @cross_origin()
    def post(self):
        request_data = {**request.form}
        request_data['tags'] = request_data.get('tags').split(',')
        the_post = PostModel(**request_data)
        user = User.objects.get(id=get_jwt_identity())
        the_post.user = user
        if request.files.get('image'):
            image = str(uuid4())
            image_fullname = f"{image}.{self.get_image_extension(request.files['image'])}"
            the_post.image = image_fullname
            request.files.get('image').save(f'media/posts/{image_fullname}')
        the_post.save()
        return {'message': 'Post created successfully'}, 200

    @cross_origin()
    def get(self):
        posts = PostModel.objects.all()
        post_json = [post.json() for post in posts]
        return {'posts': post_json}


class Post(Resource):

    @cross_origin()
    def get(self, _id):
        post = PostModel.objects.get(id=_id)
        post_json = post.json()
        return {'post': post_json}

    @jwt_required()
    @cross_origin()
    def put(self, _id):
        request_data = {**request.form}
        # post_id = request_data.pop('id')
        user = User.objects.get(id=get_jwt_identity())
        if PostModel.objects.get(user=user, id=_id):
            the_post = PostModel.objects.get(user=user, id=post_id)
            if request_data.get('tags'):
                request_data['tags'] = request_data.get('tags').split(',')
            for key in request_data:
                the_post[key] = request_data[key]
            if request.files.get('image'):
                the_post.image.put(request.files['image'])
            the_post.save()
            return {'message': 'Post updated successfully'}, 200

    @jwt_required()
    @cross_origin()
    def delete(self, _id):
        user = User.objects.get(id=get_jwt_identity())
        if PostModel.objects.get(user=user, id=_id):
            post = PostModel.objects.get(user=user, id=_id)
            post.is_active = False
            post.save()
            return {'message': 'post deactivated'}


class Tags(Resource):

    @cross_origin()
    def get(self):
        tags = []
        posts = PostModel.objects.all()
        for post in posts:
            tags += post.tags
        tags_set = set(tags)
        tags_unique_list = [tag for tag in tags_set]
        return {'tags': tags_unique_list}
