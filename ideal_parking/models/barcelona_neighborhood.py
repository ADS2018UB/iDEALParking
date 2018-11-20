# -*- coding: utf-8 -*-
from mongoengine import (
    Document, StringField, IntField, DynamicField
)


class BarcelonaNeighborhood(Document):
    """
    Barcelona Neighborhood
    """
    name = StringField(required=True)
    neighborhood_number = IntField(required=True)
    district_name = StringField(required=True)
    district_number = IntField(required=True, min_value=1, max_value=10)
    geometry = DynamicField(required=True)

    meta = {
        'indexes': [
            [
                ("geometry", "2dsphere")
            ]
        ]
    }

    @staticmethod
    def get_by_coordinates(lat, lng):
        """
        Retrieve the neighborhood that contains the given point
        """
        neighborhoods = BarcelonaNeighborhood.objects(
            geometry__geo_intersects={
                'type': 'Point',
                'coordinates': [lng, lat]
            }
        )
        return neighborhoods[0] if neighborhoods else None
