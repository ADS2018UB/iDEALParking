# -*- coding: utf-8 -*-
from mongoengine import (
    Document, StringField, IntField, DynamicField
)


class BarcelonaDistrict(Document):
    """
    Barcelona District
    """
    name = StringField(required=True)
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
        Retrieve the district that contains the given point
        """
        districts = BarcelonaDistrict.objects(
            geometry__geo_intersects={
                'type': 'Point',
                'coordinates': [lng, lat]
            }
        )
        return districts[0] if districts else None
