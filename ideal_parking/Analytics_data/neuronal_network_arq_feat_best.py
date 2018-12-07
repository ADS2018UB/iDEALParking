# -*- coding: utf-8 -*-
"""
Created on Fri Dec  7 13:27:06 2018

@author: polaz
"""

from keras.callbacks import ModelCheckpoint
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model
from sklearn.metrics import mean_absolute_error
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X = np.load("X.npy")
y = np.load("y.npy")

X_train,X_test,y_train,y_test = train_test_split(X,y,train_size=0.9,random_state=42)
scaler = StandardScaler()

X_aux_train = np.delete(X_train, [3,6], 1)
X_aux_test = np.delete(X_test, [3,6], 1)
X_train_scaled = scaler.fit_transform(X_aux_train)
X_test_scaled = scaler.transform(X_aux_test)


NN_model = Sequential()

# The Input Layer :
NN_model.add(Dense(128, kernel_initializer='normal',
                   input_dim=X_train_scaled.shape[1], activation='relu'))

# The Hidden Layers :
for l in range(4):
    NN_model.add(Dense(64, kernel_initializer='normal', activation='relu'))

# The Output Layer :
NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))

# Compile the network :
NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                 metrics=['mean_absolute_error'])
NN_model.summary()


checkpoint_name = 'Weights-best.hdf5'
checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                             verbose=1, save_best_only=True, mode='auto')
callbacks_list = [checkpoint]

NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
             validation_split=0.2, callbacks=callbacks_list)

model = load_model(checkpoint_name)
predictions = NN_model.predict(X_test_scaled)
error = mean_absolute_error(y_test, predictions)