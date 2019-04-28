from sugar_odm import MongoDBModel, Field
from sugar_api import JSONAPIMixin


class Group(MongoDBModel, JSONAPIMixin):

    __acl__ = {
        'administrator': ['all']
    }

    __database__ = {
        'name': 'pegasus'
    }

    name = Field(required=True)
