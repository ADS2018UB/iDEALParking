# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify
from wtforms import Form, FloatField
from wtforms.validators import InputRequired

from ideal_parking.models.barcelona_district import BarcelonaDistrict
from ideal_parking.analytics.parking_price_model import compute_parking_price

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
        district = BarcelonaDistrict.get_by_coordinates(
            form.latitude.data, form.longitude.data)
        print(district.district_number)
        if district:
            resp = jsonify({
                'result': {
                    'price': compute_parking_price(district.district_number),
                    'district': {
                        'name': district.name,
                        'district_number': district.district_number,
                    }
                },
                'errors': None
            })
        else:
            resp = jsonify({
                'result': None,
                'errors': ['Outside of the served zone']
            })
            resp.status_code = 404
    else:
        resp = jsonify({
            'result': None,
            'errors': ['Provide a longitude and latitude']
        })
        resp.status_code = 400
    return resp
