import pymongo
from nose.case import unittest
from mongoengine import connect

from ideal_parking.scripts.import_barcelona_shapes import import_districts
from ideal_parking.models.barcelona_district import BarcelonaDistrict


class TestModelsBarcelonaDistrict(unittest.TestCase):
    """
    Nose test suite
    """

    def setUp(self):
        self.connection = connect('mongoenginetest', is_mock=True)
        import_districts('tests/data/ciutat_vella_geojson.json')

    def tearDown(self):
        self.connection.drop_database('mongoenginetest')
        self.connection.close()

    def testFindServedDistrict(self):
        """
        Should find a served district
        """
        district = BarcelonaDistrict.get_by_coordinates(
            41.3822814923886, 2.176649109878639)
        self.assertEqual(district.district_number, 1)

    def testReturnNoneNotServedDistrictI(self):
        """
        Should return None if requested a non served area
        """
        district = BarcelonaDistrict.get_by_coordinates(
            45.3822814923886, 3.176649109878639)
        self.assertIsNone(district)
