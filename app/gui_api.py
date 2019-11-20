from aiohttp import web
from aiohttp_jinja2 import template


class GuiApi:

    def __init__(self, services):
        self.auth_svc = services.get('auth_svc')
        self.data_svc = services.get('data_svc')
        self.plugins = services.get('app_svc').get_plugins()

    @template('login.html', status=401)
    async def login(self, request):
        return dict()

    @template('login.html')
    async def logout(self, request):
        await self.auth_svc.logout_user(request)

    async def validate_login(self, request):
        return await self.auth_svc.login_user(request)

    @template('home.html')
    async def home(self, request):
        await self.auth_svc.check_permissions(request)
        p = [dict(name=getattr(p, 'name'), description=getattr(p, 'description'), address=getattr(p, 'address'))
             for p in self.plugins]
        return dict(plugins=p)

    async def clear(self, request):
        await self.auth_svc.check_permissions(request)
        await self.data_svc.clear()
        return web.Response()

    async def refresh(self, request):
        await self.auth_svc.check_permissions(request)
        await self.data_svc.refresh()
        return web.Response()

