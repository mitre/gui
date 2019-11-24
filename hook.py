from plugins.gui.app.gui_api import GuiApi

name = 'GUI'
description = 'Provides a web application structure & authentication for other plugins to build upon'
address = None


async def enable(services):
    app = services.get('app_svc').application
    gui_api = GuiApi(services=services)
    app.router.add_static('/gui', 'plugins/gui/static/', append_version=True)
    app.router.add_route('*', '/', gui_api.home)
    app.router.add_route('*', '/enter', gui_api.validate_login)
    app.router.add_route('*', '/logout', gui_api.logout)
    app.router.add_route('GET', '/login', gui_api.login)
