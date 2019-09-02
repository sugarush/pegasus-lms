from sugar_odm import MongoDB

from server import server

from models.user import User


@server.listener('before_server_start')
async def _(app, loop):
    #user = await User.find_one({ 'groups': { '$all': [ administrator.id ] } })

    user = await User.find_one({ 'username': 'admin' })

    if not user:
        await User.add({
            'username': 'admin',
            'password': 'admin',
            'groups': [ 'administrator' ]
        })
