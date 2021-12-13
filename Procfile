web: gunicorn codenamesdatabase.wsgi --log-file -
web: daphne -b 0.0.0.0 -p $PORT mysite.asgi:application
