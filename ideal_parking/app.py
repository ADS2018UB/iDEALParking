# -*- coding: utf-8 -*-

from flask import (
    Flask, jsonify,
)

app = Flask(__name__)


@app.route('/')
def index():
    return jsonify({'status': 'OK'})


if __name__ == '__main__':
    app.run()
