from server import server

from authentication import Authentication

from models.user import User
from models.course import Course


server.blueprint(Authentication.resource(url_prefix='/v1'))

server.blueprint(User.resource(url_prefix='/v1'))
server.blueprint(Course.resource(url_prefix='/v1'))

print(Course._table)
