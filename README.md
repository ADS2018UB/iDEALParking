# iDEALParking

## Back-end

The back-end is a Flask powered App.

### Install

Set up a virtualenv in Python 3:

For Linux:

```bash
virtualenv -p python3 venv
source venv/bin/activate
```

For Windows:

```bash
virtualenv -p python3 venv
source venv/Scripts/activate
```

Install the required libaries

```
pip install -r requirements.txt
```

The app requires the shapes of the Barcelona districts. Load them
using the next Flask script for Linux,

```bash
export FLASK_APP=ideal_parking
flask loadshapes data/barris_geo.json data/districtes_geo.json
```

Optionally, you can also load a set of initial data from Idealista. Use the provided Flask CLI script:

```bash
export FLASK_APP=ideal_parking
flask loaddata data/idealistaAPI-2018-Oct-30-1713.csv
```

For Windows, you should use:

```bash
set FLASK_APP=ideal_parking
flask loadshapes data/districtes_geo.json
```

and load the initial data if required

### Testing

The back-end can be tested using `tox`:

```bash
tox
```

Tox will create the testing environment. Remember to recreate the
testing environment if requirements file chaged running the tests with the recreate option:

```bash
tox -r
```

To test in local, you should provide a MongoDB database. The Travis configuration will set up a Mongo instance for you.

### Run dev server

Use Flask CLI to load the app:

```bash
FLASK_APP=ideal_parking:app flask run
```

## Front-end

The front-end is a Preact PWA. See the [front-end readme](./www/README.md) for more details.

## Docker

This app includes a `Dockerfile` to build the main web app and a `docker-compose.yml` to set up a testing environment.

The `Dockerfile` will copy and serve the build artifacts of the
front-end. Be sure to have a compiled working copy before pushing to docker repositories or servers.

To set up the Docker Compose dev, just run

```bash
docker-compose up
```

The first time it will generate a local image of the application and may take some time. It will also launch a persistent local instance of MongoDB. Remember to load
the fixtures using the installation script.

If you want to rebuild the images, for example after a back-end change, run

```bash
docker-compose build
```

otherwise, the changes won't be pushed to the Docker dev env.
