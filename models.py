from mongoengine import *


class User(Document):
    username = StringField(unique=True,required=True)
    password = StringField(unique=True,required=True)
    first_name = StringField(max_length=50,unique=True,required=True)
    last_name = StringField(max_length=50,unique=True,required=True)
    email = EmailField()
    phone = StringField(unique=True,required=True)
    image = ImageField(upload='media/images')
# todo: mr. noori with 25% of mr. jafari help ==> Post


# todo: mr. jafari ==> category
