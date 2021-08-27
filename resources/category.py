from models import Category as CategoryModel
from flask_restful import Resource, request, reqparse
from flask_cors import cross_origin


class Category(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('title')

    @cross_origin()
    def post(self):
        request_data = self.parser.parse_args()
        title = request_data.get('title')
        if not CategoryModel.objects(title=title):
            category = CategoryModel(title=title)
            category.save()
            return {'message': title + ' category created'}
        return {'message': title + " category already exists"}

    @cross_origin()
    def get(self):
        categories = CategoryModel.objects.all()
        categories_json = [category.json() for category in categories]
        return {'categories': categories_json}