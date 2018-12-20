# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify
from wtforms import Form, FloatField, BooleanField, IntegerField
from wtforms.validators import InputRequired, NumberRange
from flask_jwt_extended import get_jwt_identity, jwt_optional


from ideal_parking.models.barcelona_neighborhood import BarcelonaNeighborhood
from ideal_parking.analytics.parking_price_model import compute_parking_price

bp = Blueprint('quote', __name__, url_prefix='/api/v1/quote')


class QuoteInput(Form):
    """
    Input to request a quote using an API
    """
    longitude = FloatField(validators=[InputRequired()])
    latitude = FloatField(validators=[InputRequired()])

    parkingType = IntegerField(default=3, validators=[NumberRange(min=1, max=5)])
    hasLift = BooleanField(default=False)
    hasPlan = BooleanField(default=False)
    autDoor = BooleanField(default=False)
    alarm = BooleanField(default=False)
    secCam = BooleanField(default=False)
    secPers = BooleanField(default=False)


@bp.route('', methods=('GET', ))
@jwt_optional
def get_quote():
    """
    Get a quote from coordinates
    """
    form = QuoteInput(request.args)

    if form.validate():
        neig = BarcelonaNeighborhood.get_by_coordinates(
            form.latitude.data, form.longitude.data)
        if neig:
            user = get_jwt_identity()
            resp = jsonify({
                'result': {
                    'price': compute_parking_price(
                        form.latitude.data, form.longitude.data,
                        parking_type=form.parkingType.data if user else 2,
                        has_lift=form.hasLift.data if user else False,
                        has_plan=form.hasPlan.data if user else False,
                        aut_door=form.autDoor.data if user else False,
                        alarm=form.alarm.data if user else False,
                        sec_cam=form.secCam.data if user else False,
                        sec_pers=form.secPers.data if user else False,
                    ),
                    'district': {
                        'name': neig.district_name,
                        'district_number': neig.district_number,
                    },
                    'neighborhood': {
                        'name': neig.name,
                        'neighborhood_number': neig.neighborhood_number,
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
