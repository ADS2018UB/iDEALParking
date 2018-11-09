# -*- coding: utf-8 -*-

_mean_price_district = (
    104.52,  # Ciutat Vella
    98.39,  # Eixample
    87.13,  # Sants-Montjuïc
    99.98,  # Les Corts
    139.04,  # Sarrià-Sant Gervasi
    94.07,  # Gràcia
    85.87,  # Horta Guinardó
    79.82,  # Nou Barris
    78.51,  # Sant Andreu
    151.04,  # Sant Martí

)


def compute_parking_price(district_number):
    """
    Function to call the prediction model
    """
    if district_number < 1 or district_number > 11:
        raise ValueError('Invalid district number ' + district_number)

    return _mean_price_district[district_number]
