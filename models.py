from mongoengine import IntField, Document, StringField, ReferenceField, ListField, CASCADE, EmbeddedDocument, EnumField, EmbeddedDocumentField

# todo: mr. gachpazha ==> User

# todo: mr. jafari ==> category


class Category(Document):
    name = StringField(max_length=100, unique=True, required=True)
    category = ReferenceField('self', required=False, reverse_delete_rule=CASCADE)
    number_of_posts = IntField(min_value=0, default=0)

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
    category = ReferenceField(Category, reverse_delete_rule=CASCADE)


