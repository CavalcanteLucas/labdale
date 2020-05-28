# This is a Django-React App for managing To-Do activities.

by Lucas Cavalcante (lucas@labcodes.com.br) and Luciano Ratamero (luciano@labcodes.com.br), built from the boilerplate at https://github.com/labcodes/django-react-webpack/

## Running it

We require the following softwares to install our dependencies:
- `wget`;
- `make`;
- `curl`;
- `python>=3.6`;
- `nodejs>=8.10`;
- `npm`.

On Ubuntu 18.04, you also need:
- `libpq-dev`;
- `python3-dev`;
- `python3-pip`;
- `python3-virtualenv`.

# Automatically

Download the script `.create_project.sh` and execute it!

# Manually

After clonning the repository, create and activate a virtualenv from the project's folder:
```
virtualenv venv
source venv/bin/activate
```

Then run:
```
make install_dependencies
```

You can copy the `env.example` file to `.env`, so that the django app has access to evironment variables via python-decouple, then run:
```
python manage.py migrate
```
to create a dev database. Finally:
```
make run
```
so that both webpack and Django run in parallel.

If everything went right, you should have a server running at `localhost:8000`. Visit that on your browser to make sure everything is working <3

# After installation

Don't forget to create a superuser for managing Django admin with
```
python manage.py createsuperuser
```

## Adding new dependencies

If you wish to add new dependencies, just note that:

- For python dependencies, use `pip install name_of_the_dependency` to install then `pip freeze > requirements.txt` to permanently add it to the requirements;
- For js dependencies, we're using nvm and yarn, so be sure to run `nvm use` before running `npx yarn add name_of_the_dependency` or, if it's a development-only dependency, `npx yarn add name_of_the_dependency -D`.

## Deploying to Heroku

Assuming you have [installed the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli), logged in, and created a domain (in this case, http://todo-labc.herokuapp.com/), you can configure your App for running this project with:

```heroku git:remote -a todo-labc
heroku buildpacks:set heroku/python
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks # To check the buildpacks
heroku config:set SECRET_KEY='Your secret key'
```