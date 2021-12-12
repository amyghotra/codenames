from settings import PROJECT_ROOT, SITE_ROOT
import os

DEBUG = True
TEMPLATE_DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        'NAME': 'codenames_database',                     
        'USER': 'codenames_admin',
        'PASSWORD': 'fall2021',
        'HOST': '127.0.0.1',                      
        'PORT': '3306',
    }
}