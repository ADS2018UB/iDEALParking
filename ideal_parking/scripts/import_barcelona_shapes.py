# -*- coding: utf-8 -*-
import json

from ideal_parking.models.barcelona_district import BarcelonaDistrict
from ideal_parking.models.barcelona_neighborhood import BarcelonaNeighborhood


def import_districts(file_path):
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


def import_neighborhoods(file_path):
    """
    Import Barcelona neighborhood
    """
    BarcelonaNeighborhood.drop_collection()
    with open(file_path, 'rt') as geojson_file:
        data = json.load(geojson_file)

        neighborhoods = data.get('features', [])
        for neighborhood in neighborhoods:
            props = neighborhood['properties']
            BarcelonaNeighborhood(
                name=props['N_Barri'],
                neighborhood_number=int(props['C_Barri']),
                district_name=props['N_Distri'],
                district_number=int(props['C_Distri']),
                geometry=neighborhood['geometry'],
            ).save()
