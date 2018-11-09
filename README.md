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
