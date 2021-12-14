# Codenames ## Team Fluffy Turtles

Hunter College Fall 2021
CSCI 499 Captsone Project

Website implementing Codenames card game

See our Figma wireframes [here](https://www.figma.com/file/R78tXWoVIj3EFh37z35Bg3/Codenames-Wireframe?node-id=0%3A1)

Weekly Reports [here](https://docs.google.com/presentation/d/1jvQTl43Up2FzqWHJHW8xtZFXSChvcgPZbrp_C1W3bxk/edit?usp=sharing)

### Team:
1. Stephanie Bravo
2. Daniel Rizzo
3. Michael Tse
4. Kevin Xie
5. Amy Ghotra

## Codenames URLs
1. Frontend (actual game): [https://codenames21.herokuapp.com](https://codenames21.herokuapp.com)
2. Backend / API: [https://codenames21-backend.herokuapp.com](https://codenames21-backend.herokuapp.com)

## Running Codenames Locally
### Frontend
- Navigate into the codenames folder in your directory
- Run `npm install` to run the necessary packages
- Run `npm run` once the package installation is complete
### Backend
- Make sure that you have MySQL locally installed
- Run your local MySQL with the command `mysql.server start`
- Navigate to codename_database/codenamesdatabase/settings.py and modify the Database section by using your personal/local database credentials
- Comment out `local_settings.py` if necessary
- Navigate to codename_database/codenames/serializers.py and modify the path in the `getGameWords()` function. Right-click the odename_database/codenames/words.csv file, obtain the path, and substitute the original path with your new one
- Start Redis by running `redis-server --port 5379` in your local terminal
- Open up another terminal and navigate to `codename_database/codenamesdatabase` and run `python manage.py runserver`

#### Have Fun :)
