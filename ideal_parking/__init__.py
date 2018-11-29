import os
import click
from flask import Flask, send_from_directory
from flask_mongoengine import MongoEngine
from flask_cors import CORS
from flask_jwt_extended import JWTManager


app = None


def create_app(test_config=None):
    global app

    # create and configure the app
    app = Flask(__name__, instance_relative_config=True, static_folder=None)
    app.config.from_mapping(
        SECRET_KEY='dev',
        MONGODB_SETTINGS={
            'host': os.getenv('MONGO_URL', 'mongodb://localhost/ideal_parking_dev')
        },
        JWT_SECRET_KEY=os.getenv('JWT_SECRET_KEY', ''),
    )

    JWTManager(app)
    MongoEngine(app)
    CORS(app)

    if test_config:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from ideal_parking.api import quote, user
    app.register_blueprint(quote.bp)
    app.register_blueprint(user.bp)

    # a simple page that says hello
    @app.route('/', defaults={'path': 'index.html'})
    @app.route("/<path:path>")
    def static_file(path):
        return send_from_directory('../www/build', path)

    return app


create_app()

# Scripts


@app.cli.command()
@click.argument('csv_path')
def loaddata(csv_path):
    from ideal_parking.scripts.load_fixtures import load_idealista_csv
    load_idealista_csv(csv_path)


@app.cli.command()
@click.argument('neighborhoods_path')
@click.argument('districts_path')
def loadshapes(districts_path, neighborhoods_path):
    from ideal_parking.scripts.import_barcelona_shapes import (
        import_districts, import_neighborhoods
    )
    import_districts(districts_path)
    import_neighborhoods(neighborhoods_path)
