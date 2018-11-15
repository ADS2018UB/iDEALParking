# iDEALParking

## Back-end

The back-end is a Flask powered App.

### Install

Set up a virtualenv in Python 3:

```bash
virtualenv -p python3 venv

source venv/bin/activate
```

Install the required libaries

```
pip install -r requirements.txt
```

The app requires the shapes of the Barcelona districts. Load them
using the next Flask script,

```bash
export FLASK_APP=ideal_parking
flask loadshapes data/districtes_geo.json
```

Optionally, you can also load a set of initial data from Idealista. Use the provided Flask CLI script:

```bash
export FLASK_APP=ideal_parking
flask loaddata data/idealistaAPI-2018-Oct-30-1713.csv
```

If you are using Windows, you should use:

```bash
set FLASK_APP=ideal_parking
```


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

### Testing

Test in watch mode using

```bash
npm run test
```

Test in CI mode, single pass, using

```bash
npm run test:ci
```
