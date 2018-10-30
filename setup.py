# -*- coding: utf-8 -*-
from setuptools import setup, find_packages


def install_reqs():
    with open('requirements.txt') as f:
        return f.read().splitlines()


setup(
    name='ideal_parking',
    version='1.0',
    packages=find_packages(exclude=('tests',)),
    include_package_data=True,
)
