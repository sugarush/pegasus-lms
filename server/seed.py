from sugar_odm import MongoDB

from server import server

from models.user import User
from models.group import Group


@server.listener('before_server_start')
async def before_server_start(app, loop):
    administrator = await Group.find_one({ 'name': 'administrator' })

    if not administrator:
        administrator = await Group.add({
            'name': 'administrator'
        })

    user = await User.find_one({ 'groups': { '$all': [ administrator.id ] } })

    if not user:
        admin = await User.add({
            'username': 'admin',
            'groups': [ administrator.id ]
        })
        admin.set_password('admin')
        await admin.save()

@server.listener('before_server_start')
async def before_server_start(app, loop):
    professor = await Group.find_one({ 'name': 'professor' })

    if not professor:
        Group.add({
            'name': 'professor'
        })

    student = await Group.find_one({ 'name': 'student' })

    if not student:
        Group.add({
            'name': 'student'
        })
