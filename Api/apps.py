from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'Api'

    def ready(self):
        import Api.signals
