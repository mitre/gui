from aiohttp_jinja2 import template


class GuiApi:

    def __init__(self, services):
        self.auth_svc = services.get('auth_svc')
        self.data_svc = services.get('data_svc')

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
        plugins = await self.data_svc.locate('plugins')
        return dict(plugins=sorted(plugins, key=lambda x: x.name))
