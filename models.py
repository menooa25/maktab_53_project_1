<<<<<<< HEAD
from mongoengine import connect, Document, StringField, ReferenceField, ListField, CASCADE, EmbeddedDocument, EnumField,\
    EmbeddedDocumentField, EmailField,ImageField
=======
from mongoengine import *
>>>>>>> origin/masoud
# todo: mr. gachpazha ==> User


class User(Document):
    username = StringField(unique=True,required=True)
    password = StringField(unique=True,required=True)
    first_name = StringField(max_length=50,unique=True,required=True)
    last_name = StringField(max_length=50,unique=True,required=True)
    email = EmailField()
    phone = StringField(unique=True,required=True)
    image = ImageField(upload='media/images')
# todo: mr. noori with 25% of mr. jafari help ==> Post


class Comment(EmbeddedDocument):
    content = StringField(required=True)
    user = StringField()


class Like(EmbeddedDocument):
    user = StringField()


class Dislike(EmbeddedDocument):
    user = StringField()


class Post(Document):
    title = StringField(max_length=50, required=True)
    description = StringField(required=True)
    image = StringField()
    tags = ListField(StringField(required=True))
    comments = ListField(EmbeddedDocumentField(Comment))

# todo: mr. jafari ==> category
class Category(Document):
    name = StringField(max_length=100, unique=True, required=True)
    sub_cat = ReferenceField('self', required=False, reverse_delete_rule=CASCADE)
    number_of_posts = IntField(min_value=0, default=0)
