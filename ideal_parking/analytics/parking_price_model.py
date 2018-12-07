# -*- coding: utf-8 -*-
import math
import os
import numpy as np

from ideal_parking.models.barcelona_neighborhood import BarcelonaNeighborhood


_CENTER_RADIANS = None
_MODEL = None
_SCALER = None

RADIUS_EARTH = 6371000.0


class OutOfServerAreaError(Exception):
    """
    Error due to getting a quote outside Barcelona
    """
    pass


def compute_parking_price(
        lat, lng, parking_type=3, has_lift=False, has_plan=False, new_dev=False):
    """
    Function to call the prediction model
    """

    if not isinstance(parking_type, int) or parking_type < 1 or parking_type > 5:
        raise ValueError('parking_type must be an integer between 1 and 5')

    if not isinstance(has_lift, bool):
        raise ValueError('has_lift must be a boolean')

    if not isinstance(has_plan, bool):
        raise ValueError('has_plan must be a boolean')

    if not isinstance(new_dev, bool):
        raise ValueError('new_dev must be a boolean')

    # Computate the distance from the coordinates
    distance = _get_distance_from_center(lat, lng)

    # Get the neighborhood
    nei = _get_neighborhood(lat, lng)

    # Create the X vector
    X_user = np.array([
        parking_type, distance, nei.district_number,
        int(has_lift), int(has_plan), nei.neighborhood_number, int(new_dev),
    ])
    X_user = X_user[np.newaxis, :]

    # Scale the data
    scaler = _get_scaler()
    X_user_scaled = scaler.transform(X_user)

    # Load the model
    model = _get_model()

    # Predict the price
    price = model.predict(X_user_scaled)
    return round(float(price[0][0]), 2)


def _get_distance_from_center(latitude, longitude):
    """
    Compute the distance to the Idealista center using degree coordinates
    """
    global _CENTER_RADIANS
    if _CENTER_RADIANS is None:
        _CENTER_RADIANS = {
            'lat': math.radians(41.3851001),
            'lng': math.radians(2.1736845),
        }

    lat = math.radians(latitude)
    lng = math.radians(longitude)

    inc_long = lng - _CENTER_RADIANS['lng']
    inc_lat = lat - _CENTER_RADIANS['lat']

    a = (math.sin(inc_lat / 2)) ** 2 + math.cos(lat) * \
        math.cos(_CENTER_RADIANS['lat']) * (math.sin(inc_long / 2)) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    return RADIUS_EARTH * c


def _get_neighborhood(lat, lng):
    neig = BarcelonaNeighborhood.get_by_coordinates(lat, lng)
    if neig is None:
        raise OutOfServerAreaError('Out of range')

    return neig


def _get_model():
    global _MODEL
    if _MODEL is None:
        from keras.models import load_model
        path = os.path.join(
            os.path.abspath(os.path.dirname(__file__)),
            'Weights-best.hdf5'
        )
        _MODEL = load_model(path)
    return _MODEL


def _get_scaler():
    global _SCALER
    if _SCALER is None:
        from sklearn.preprocessing import StandardScaler
        path = os.path.join(
            os.path.abspath(os.path.dirname(__file__)),
            './X.npy'
        )
        with open(path, 'rb') as file:
            X = np.load(file)
            _SCALER = StandardScaler()
            _SCALER.fit_transform(X)
    return _SCALER
