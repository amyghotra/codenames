# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'k@)rec)_yu&0z2hmey#8j^rs-3-0pd=nc%zg7=z#ra9q5(6+if'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': 'codenames_database',
        'USER': 'root',
        'PASSWORD': 'Genjimada1!',
        'HOST': '127.0.0.1',
        'PORT': '4001',
        'OPTIONS': {
            'autocommit': True
        }
    }
}