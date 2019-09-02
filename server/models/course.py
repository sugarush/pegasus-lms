from sugar_odm import MongoDBModel, Model, Field
from sugar_api import JSONAPIMixin


class Section(Model):

    name = Field(required=True)
    instructor = Field(required=True)

    students = Field(type=[ str ])


class Course(MongoDBModel, JSONAPIMixin):

    __rate__ = (1, 'secondly')

    __acl__ = {
        'administrator': [ 'all' ],
        'other': [ 'read', 'read_all' ]
    }

    __database__ = {
        'name': 'pegasus'
    }

    name = Field(required=True)
    description = Field(required=True)

    sections = Field(type=[ Section ])
