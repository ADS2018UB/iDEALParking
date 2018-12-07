# -*- coding: utf-8 -*-
from flask import Blueprint, request, jsonify
from wtforms import Form, StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length
from flask_jwt_extended import (
    create_access_token, get_jwt_identity, jwt_optional,
)
from mongoengine.errors import NotUniqueError, DoesNotExist

from ideal_parking.models.user import User


bp = Blueprint('user', __name__, url_prefix='/api/v1/user')


class LoginInput(Form):
    """
    Input to get a token using the API
    """
    email = StringField(validators=[Email(), InputRequired()])
    password = StringField(validators=[InputRequired()])


class SignupInput(Form):
    """
    Input to register a new user
    """
    name = StringField(validators=[InputRequired()])
    email = StringField(validators=[InputRequired(), Email()])
    password = PasswordField(validators=[
        InputRequired(), Length(min=6, max=15),
    ])


@bp.route('/login', methods=('POST', ))
def login():
    """
    Login a user
    """
    form = LoginInput(request.form)

    if form.validate():
        try:
            user = User.objects.get(email=form.email.data)
        except DoesNotExist:
            user = None

        if user is None or not user.authenticate(form.password.data):
            resp = jsonify({
                'result': None,
                'errors': ['Invalid credentials']
            })
            resp.status_code = 401
        else:
            access_token = create_access_token(identity=str(user.id))
            resp = jsonify({
                'results': {
                    'access_token': access_token,
                },
                'errors': None,
            })

    else:
        resp = jsonify({
            'result': None,
            'errors': ['Provide a valid e-mail and the password']
        })
        resp.status_code = 400
    return resp


@bp.route('', methods=('POST', ))
def user_create():
    """
    Create a user
    """
    form = SignupInput(request.form)

    if form.validate():
        try:
            user = User.create(
                name=form.name.data,
                email=form.email.data,
                password=form.password.data,
            )

            return jsonify({
                'result': {
                    'name': user.name,
                    'email': user.email,
                }
            })

        except NotUniqueError:
            return jsonify({
                'result': None,
                'errors': ['User already exists']
            }), 400

    return jsonify({
        'result': None,
        'errors': form.errors
    }), 400


@bp.route('whoami', methods=('GET', ))
@jwt_optional
def whoami():
    current_user = get_jwt_identity()
    if current_user:
        user = User.objects.get(id=current_user)
        if user is None:
            return jsonify({
                'result': None,
                'errors': ['Invalid user']
            }), 404

        return jsonify({
            'result': {
                'id': current_user,
                'name': user.name,
                'email': user.email,
            },
            'errors': None,
        }), 200
    else:
        return jsonify({
            'result': {
                'id': None,
                'name': 'anonymous_user',
                'email': None,
            },
            'errors': None,
        }), 200
