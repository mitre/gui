from plugins.gui.app.gui_api import GuiApi

name = 'GUI'
description = 'Provides a web application structure & authentication for other plugins to build upon'
address = None
store = None


async def initialize(app, services):
    gui_api = GuiApi(auth_svc=services.get('auth_svc'), plugins=services.get('plugins'))
    services.get('auth_svc').set_unauthorized_static('/gui', 'plugins/gui/static/', append_version=True)
    services.get('auth_svc').set_authorized_route('GET', '/', gui_api.home)
    services.get('auth_svc').set_unauthorized_route('GET', '/logout', gui_api.logout)
    services.get('auth_svc').set_unauthorized_route('*', '/enter', gui_api.enter)
    services.get('auth_svc').set_authorized_route('POST', '/user/password', gui_api.reset_password)

    services.get('auth_svc').set_new_login_landing("/enter")
