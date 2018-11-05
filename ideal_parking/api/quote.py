from flask import Blueprint, request, jsonify
from wtforms import Form, FloatField
from wtforms.validators import InputRequired

bp = Blueprint('quote', __name__, url_prefix='/api/v1/quote')


class QuoteInput(Form):
    """
    Input to request a quote using an API
    """
    longitude = FloatField(validators=[InputRequired()])
    latitude = FloatField(validators=[InputRequired()])


@bp.route('/', methods=('GET', ))
def get_quote():
    """
    Get a quote from coordinates
    """
    form = QuoteInput(request.args)
    if form.validate():
        return jsonify({
            'result': {
                'price': 1000
            },
            'errors': None
        })

    resp = jsonify({
        'result': None,
        'errors': ['Provide a longitude and latitude']
    })
    resp.status_code = 400
    return resp
