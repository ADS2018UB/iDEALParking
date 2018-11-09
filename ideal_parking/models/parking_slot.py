# -*- coding: utf-8 -*-
from mongoengine import (
    Document, PointField, StringField, FloatField
)


class ParkingSlot(Document):
    """
    Parking slot used to train the models
    """
    coordinates = PointField(required=True)
    district = StringField()
    price = FloatField(required=True)
    size = StringField()
    address = StringField()
    surface = FloatField()
