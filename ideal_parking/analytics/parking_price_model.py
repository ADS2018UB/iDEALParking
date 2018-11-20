# -*- coding: utf-8 -*-

#_mean_price_district = (
#    104.52,  # Ciutat Vella
#    98.39,  # Eixample
#    87.13,  # Sants-Montjuïc
#    99.98,  # Les Corts
#    139.04,  # Sarrià-Sant Gervasi
#    94.07,  # Gràcia
#    85.87,  # Horta Guinardó
#    79.82,  # Nou Barris
#    78.51,  # Sant Andreu
#    151.04,  # Sant Martí
#
#)


def compute_parking_price(parking_type, lat_coord, long_coord, district_number, 
                          hasLift, hasPlan, neighborhood, NewDev):
    """
    Function to call the prediction model
    """
    import math
    import numpy as np
    from sklearn.preprocessing import StandardScaler
    from keras.models import load_model
    
    # Definition of the function that converts the coordinates into distance
    def coordinates_to_distance(latitude,longitude):
        latitude_center = math.radians(41.3851001)
        longitude_center = math.radians(2.1736845)
        latitude_1 = math.radians(latitude)
        longitude_1 = math.radians(longitude)
        R_earth = 6371000.0
        inc_long = longitude_1-longitude_center
        inc_lat = latitude_1-latitude_center
        a = (math.sin(inc_lat/2))**2 + math.cos(latitude_1)*math.cos(latitude_center)*(math.sin(inc_long/2))**2
        c = 2*np.arctan2(np.sqrt(a),np.sqrt(1-a))
        d = R_earth*c
        return d
    
    # Check all the input variables
    if district_number < 1 or district_number > 10:
        raise ValueError('Invalid district number ' + str(district_number))
        
    if parking_type < 1 or parking_type > 5:
        raise ValueError('Invalid parking type ' + str(parking_type))
        
    if hasLift < 0 or hasLift > 1:
        raise ValueError('\'HasLift\' must be 0 or 1. Actual value = ' + str(hasLift))
        
    if hasPlan < 0 or hasPlan > 1:
        raise ValueError('\'HasPlan\' must be 0 or 1. Actual value = ' + str(hasPlan))
    
    if neighborhood < 1 or neighborhood > 73:
        raise ValueError('Invalid neighborhood ' + str(neighborhood))

    if NewDev < 0 or NewDev > 1:
        raise ValueError('\'NewDev\' must be 0 or 1. Actual value = ' + str(NewDev))
    
    #Computate the distance from the coordinates
    distance = coordinates_to_distance(lat_coord,long_coord)
    
    #Create the X vector
    X_user = np.array([parking_type,distance,district_number,hasLift,hasPlan,neighborhood,NewDev])
    X_user = X_user[np.newaxis,:]
    
    #Scale the data
    X = np.load("X.npy")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X)
    X_user_scaled = scaler.transform(X_user)
    
    #Load the model 
    model_name = 'Weights-092--402.14526.hdf5'
    model = load_model(model_name)
    
    #Predict the price
    price = model.predict(X_user_scaled)
    
    return price

