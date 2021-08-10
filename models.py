from mongoengine import *
# todo: mr. gachpazha ==> User

# todo: mr. noori with 25% of mr. jafari help ==> Post


# todo: mr. jafari ==> category
class Category(Document):
    name = StringField(max_length=100, unique=True, required=True)
    sub_cat = ReferenceField('self', required=False, reverse_delete_rule=CASCADE)
    number_of_posts = IntField(min_value=0, default=0)
