import os
import click
from flask import Flask, jsonify
from flask_mongoengine import MongoEngine

app = None


def create_app(test_config=None):
    global app

    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGODB_SETTINGS={
            'host': os.getenv('MONGODB_URL', 'mongodb://localhost/ideal_parking_dev')
        }
    )
    MongoEngine(app)

    if test_config:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from ideal_parking.api import quote
    app.register_blueprint(quote.bp)

    # a simple page that says hello
    @app.route('/')
    def hello():
        return jsonify({'status': 'OK'})

    return app


create_app()

# Scripts


@app.cli.command()
@click.argument('csv_path')
def loaddata(csv_path):
    from ideal_parking.scripts.load_fixtures import load_idealista_csv
    load_idealista_csv(csv_path)
