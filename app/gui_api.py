from aiohttp_jinja2 import template


class GuiApi:

    def __init__(self, services, plugins):
        self.services = services
        self.caldera_config = services.get('utility_svc').get_config()
        self.auth_svc = services.get('auth_svc')
        self.plugins = plugins

    def get_attack_url(self, request=None):
        if 'attack_svc' in self.services:
            return self.services.get('attack_svc').get_attack_url(request=request)
        elif 'attack_url' in self.caldera_config:
            return self.caldera_config['attack_url']
        else:
            return 'https://attack.mitre.org'

    @template('login.html')
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
        return dict(plugins=p, attack_url=self.get_attack_url(request=request))

