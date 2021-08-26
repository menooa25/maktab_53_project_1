from base64 import b64encode
from mongoengine import connect, Document, StringField, ReferenceField, ListField, CASCADE, EmbeddedDocument, \
    EmbeddedDocumentField, EmailField, ImageField, BooleanField

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

    def json(self):
        return self.title


# todo: mr. noori with 25% of mr. jafari help ==> Post


class Comment(EmbeddedDocument):
    content = StringField(required=True)
    user = StringField()


class Dislike(EmbeddedDocument):
    user = StringField()



class Post(Document):
    title = StringField(max_length=50, required=True)
    description = StringField(required=True)
    image = StringField()
    is_active = BooleanField(default=True)
    tags = ListField(StringField(required=True))
    likes = ListField(StringField())
    dislikes = ListField(EmbeddedDocumentField(Dislike))
    comments = ListField(EmbeddedDocumentField(Comment))
    user = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)
    # category = ReferenceField(Category, reverse_delete_rule=CASCADE)
    category = StringField()

    def get_image(self):
        if self.image:
            with open(f'media/posts/{self.image}', 'rb') as f:
                return str(b64encode(f.read()))[2:-1]
    def get_comment_list(self):
        comment_list = [comment.content for comment in self.comments]
        return comment_list
    def json(self):
        return {"id": str(self.id), "title": self.title, "description": self.description, "image": self.get_image(),
                "is_active": self.is_active, 'tags': self.tags,'likes':len(self.likes),'comments':self.get_comment_list()}
