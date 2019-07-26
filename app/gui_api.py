from aiohttp_jinja2 import template


class GuiApi:

    def __init__(self, auth_svc, plugins):
        self.auth_svc = auth_svc
        self.plugins = plugins

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

