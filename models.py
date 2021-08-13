from mongoengine import connect, Document, StringField, ReferenceField, ListField, CASCADE, EmbeddedDocument, \
    EmbeddedDocumentField, EmailField

connect('maktab_53_project1')


# todo: mr. gachpazha ==> User

class User(Document):
    username = StringField(unique=True, required=True)
    password = StringField(required=True)
    first_name = StringField(max_length=50, required=True)
    last_name = StringField(max_length=50, required=True)
    email = EmailField()
    phone = StringField(unique=True, required=True)
    image = StringField()


# todo: mr. jafari ==> category


class Category(Document):
    title = StringField(max_length=150, required=True)
    category = ReferenceField('Category', reverse_delete_rule=CASCADE)


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
    likes = ListField(EmbeddedDocumentField(Like))
    dislikes = ListField(EmbeddedDocumentField(Dislike))
    comments = ListField(EmbeddedDocumentField(Comment))
    user = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)
    post = ReferenceField(Category, reverse_delete_rule=CASCADE)