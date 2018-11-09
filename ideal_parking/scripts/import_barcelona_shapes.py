# -*- coding: utf-8 -*-
import json

from ideal_parking.models.barcelona_district import BarcelonaDistrict


def import_geojson(file_path):
    """
    Import Barcelona districts
    """
    BarcelonaDistrict.drop_collection()
    with open(file_path, 'rt') as geojson_file:
        data = json.load(geojson_file)

        districts = data.get('features', [])
        for district in districts:
            props = district['properties']
            BarcelonaDistrict(
                name=props['N_Distri'],
                district_number=int(props['C_Distri']),
                geometry=district['geometry'],
            ).save()
