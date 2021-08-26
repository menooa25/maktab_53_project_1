from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, request
from uuid import uuid4
import os
from ..models import User, Post as PostModel


class Post(Resource):
    # todo: mr. gachpazha ==> post
    @jwt_required()
    @cross_origin()
    def post(self):
        request_data = {**request.form}
        request_data['tags'] = request_data.get('tags').split(',')
        if not request_data['tags'][-1]:
            request_data['tags'].pop()
        the_post = PostModel(**request_data)
        user = User.objects.get(id=get_jwt_identity())
        the_post.user = user
        if request.files.get('image'):
            image = str(uuid4())
            the_post.image = image
            request.files.get('image').save(f'media/posts/{image}')
        the_post.save()
        return {'msg': 'Post created successfully'}, 200

    # todo: mr. noory ==> put
    @jwt_required()
    @cross_origin()
    def put(self):
        request_data = {**request.form}
        if request_data.get('is_active') == '1':
            request_data['is_active'] = True
        else:
            request_data['is_active'] = False
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

    @jwt_required()
    @cross_origin()
    def patch(self):
        user = User.objects.get(id=get_jwt_identity())
        posts = PostModel.objects(user=user)
        post_json = [post.json() for post in posts]
        return {'post': post_json}

    # todo: mr. noory ==> get
    @cross_origin()
    def get(self):

        posts = PostModel.objects.all()

        post_json = [post.json() for post in posts]
        return {'posts': post_json}

    # todo: mr. noory ==> delete
    def delete_image(self, image):
        os.remove(f'media/posts/{image}')

    @jwt_required()
    @cross_origin()
    def delete(self):
        user = User.objects.get(id=get_jwt_identity())
        _id = request.json.get('id')
        post = PostModel.objects.get(id=_id, user=user)
        if post.image:
            self.delete_image(post.image)
        post.delete()
        return {'msg': 'post deleted'}


class GetPost(Resource):
    # todo: mr. gachpazha post

    @cross_origin()
    def post(self):
        tag = request.json.get('tag')
        category = request.json.get('category')
        search = request.json.get('search')
        id = request.json.get('id')

        posts = None
        if id:
            posts = PostModel.objects(id__contains=id)
        elif search:
            posts = PostModel.objects(title__contains=search) or PostModel.objects(
                description__contains=search) or PostModel.objects(tags__contains=search) or PostModel.objects(
                category__contains=search)
        else:
            posts = PostModel.objects(tags__contains=tag, category__contains=category)

        post_json = [post.json() for post in posts]
        return {'posts': post_json}


class Tags(Resource):
    # todo: mr. jafari ==> get

    @cross_origin()
    def get(self):
        tags = []
        posts = PostModel.objects.all()
        for post in posts:
            tags += post.tags
        tags_set = set(tags)
        tags_unique_list = [tag for tag in tags_set]
        return {'tags': tags_unique_list}
