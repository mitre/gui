from aiohttp import web
from aiohttp_jinja2 import template
from aiohttp_session import get_session


class GuiApi:

    def __init__(self, auth_svc, plugins):
        self.auth_svc = auth_svc
        self.plugins = plugins

    @template('login.html')
    async def enter(self, request):
        data = await request.post()
        if await self.auth_svc.login(data.get('username'), data.get('password')):
            session = await get_session(request)
            await self.auth_svc.login_wrapper(session, data.get('username'))
            return web.HTTPFound('/')

    @template('login.html')
    async def logout(self, request):
        session = await get_session(request)
        await self.auth_svc.logout_wrapper(session)

    @template('home.html')
    async def home(self, request):
        p = [dict(name=getattr(p, 'name'), description=getattr(p, 'description'), address=getattr(p, 'address'))
             for p in self.plugins]
        return dict(plugins=p)

    async def reset_password(self, request):
        session = await get_session(request)
        submission = await request.json()
        resp = await self.auth_svc.reset_wrapper(submission, session)
        return resp
