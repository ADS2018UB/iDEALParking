# -*- coding: utf-8 -*-
"""
Created on Fri Nov 16 01:11:07 2018

@author: polaz
"""


from keras.callbacks import ModelCheckpoint
from keras.models import Sequential
from keras.layers import Dense, Activation, Flatten
from sklearn.metrics import mean_absolute_error 
from matplotlib import pyplot as plt
import seaborn as sb
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn import model_selection



X = np.load("X.npy")
y = np.load("y.npy")

scaler = StandardScaler()
#X_train,X_test,y_train,y_test = model_selection.train_test_split(X,y,train_size=0.8,random_state=42)
X_train_scaled = scaler.fit_transform(X)
y_train = y
#X_test_scaled = scaler.transform(X_test)


NN_model = Sequential()

# The Input Layer :
NN_model.add(Dense(128, kernel_initializer='normal',input_dim = X_train_scaled.shape[1], activation='relu'))

# The Hidden Layers :
NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))
NN_model.add(Dense(256, kernel_initializer='normal',activation='relu'))

# The Output Layer :
NN_model.add(Dense(1, kernel_initializer='normal',activation='linear'))

# Compile the network :
NN_model.compile(loss='mean_squared_error', optimizer='adam', metrics=['mean_squared_error'])
NN_model.summary()

checkpoint_name = 'Weights-{epoch:03d}--{val_loss:.5f}.hdf5' 
checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss', verbose = 1, save_best_only = True, mode ='auto')
callbacks_list = [checkpoint]

NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32, validation_split = 0.2, callbacks=callbacks_list)


#predictions = NN_model.predict(X_test_scaled)

## Correlation between features

#X_train = X_train[num_cols + cat_cols]
#train_data['Target'] = y
#
#C_mat = train_data.corr()
#fig = plt.figure(figsize = (15,15))
#
#sb.heatmap(C_mat, vmax = .8, square = True)
#plt.show()


