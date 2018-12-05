# -*- coding: utf-8 -*-
import os
import bcrypt

from mongoengine import (
    Document, StringField, IntField, BooleanField,
    EmbeddedDocumentField, EmbeddedDocument, DynamicField,
)


class ParkingPreference(EmbeddedDocument):
    """
    Preferences related to parking quotes
    """
    parking_parkintype = IntField(min_value=1, max_value=5, default=3),
    has_lift = BooleanField(default=False)
    has_plan = BooleanField(default=False)
    new_dev = BooleanField(default=False)


class User(Document):
    """
    User Model
    """
    name = StringField(required=True)
    email = StringField(required=True, unique=True)

    parking_preference = EmbeddedDocumentField(ParkingPreference)

    _password = DynamicField(required=True)

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)

        self.authenticated = False

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, new_pass):
        if new_pass:
            PASSWORD_SALT = os.environ.get('PASSWORD_SALT')
            self._password = bcrypt.hashpw(new_pass.encode(
                'utf-8'), PASSWORD_SALT.encode('utf-8'))

    @staticmethod
    def create(name, email, password, parking_preference=None):
        user = User(
            name=name,
            email=email,
            parking_preference=parking_preference
        )
        user.password = password
        user.save()
        return user

    def authenticate(self, password):
        self.authenticated = False
        if password is not None:
            self.authenticated = bcrypt.checkpw(password.encode('utf-8'), self._password)
        return self.authenticated
