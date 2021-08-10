from mongoengine import connect, Document, StringField, ReferenceField, ListField, CASCADE, EmbeddedDocument, EnumField, EmbeddedDocumentField
# todo: mr. gachpazha ==> User

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
