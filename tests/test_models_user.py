import pymongo
import os

from nose.case import unittest
from mongoengine import connect
from mongoengine.connection import get_connection


class TestModelsUser(unittest.TestCase):
    """
    Nose test suite
    """

    def setUp(self):
        os.environ['PASSWORD_SALT'] = '$2b$12$Yp8E0oALlS48tErESh89c.'
        self.connection = connect('mongoenginetest')
        from ideal_parking.models.user import User
        self.model = User
        self._users = []
        

    def tearDown(self):
        for user in self._users:
            user.delete()
        self.connection.close()

    def testCreateUser(self):
        """
        Should create a user
        """
        self._user_factory()

        self.assertIsNotNone(self.model.objects.get(email='TEST_USER_EMAIL'))

    def testAuthenticate(self):
        """
        Should create a user
        """
        user = self._user_factory()
        user.authenticate('USER_PASSWORD')
        self.assertTrue(user.authenticated)

        user.authenticate('USER_PASSWORD_2')
        self.assertFalse(user.authenticated)

    def testUniqueEmail(self):
        self._user_factory(email='EMAIL_1')
        with self.assertRaises(Exception):
            self._user_factory(email='EMAIL_1')

    def _user_factory(self, name='TEST_USER_NAME', email='TEST_USER_EMAIL', password='USER_PASSWORD'):
        user = self.model(
            name=name, email=email,
        )
        user.password = password
        user.save()
        self._users.append(user)
        return user
