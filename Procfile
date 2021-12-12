web: python manage.py runserver 0.0.0.0:$PORT --noreload
web: gunicorn codenamesdatabase.wsgi --log-file -
web: bin/boot