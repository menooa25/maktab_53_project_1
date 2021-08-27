from ..models import Comment as CommentModel
from ..models import Post as PostModel
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse, request


class Like(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('id', required=True, help='You cant lef id blank')

    def check_user_liked(self, user_id:str, post_likes) -> bool:
        if user_id in post_likes:
            return True
        return False

    @jwt_required()
    @cross_origin()
    def post(self):
        response = {"msg": ""}
        request_data = self.parser.parse_args()
        post_id = request_data.get('id')
        user_id = str(get_jwt_identity())
        post = PostModel.objects.get(id=post_id)
        if self.check_user_liked(user_id, post.likes):
            post.likes.remove(user_id)
            post.save()
            response['msg'] = "disliked"
        else:
            post.likes += [user_id, ]
            post.save()
            response['msg'] = "liked"

        return response, 200


class Comment(Resource):

    @jwt_required()
    @cross_origin()
    def post(self):
        request_data = request.form
        post_id = request_data.get('id')
        user_id = str(get_jwt_identity())
        comment = CommentModel(user=user_id,content=request_data.get('comment'))
        post = PostModel.objects.get(id=post_id)
        post.comments.append(comment)
        post.save()
        return {'message': "Thanks for comment <3"}
