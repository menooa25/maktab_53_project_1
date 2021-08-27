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
