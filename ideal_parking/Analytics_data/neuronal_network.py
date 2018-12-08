# -*- coding: utf-8 -*-
"""
Created on Fri Nov 16 01:11:07 2018

@author: polaz
"""


from keras.callbacks import ModelCheckpoint
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error


X = np.load("X.npy")
y = np.load("y.npy")

scaler = StandardScaler()
X_train,X_test,y_train,y_test = train_test_split(X,y,train_size=0.8,random_state=42)
X_train_scaled = scaler.fit_transform(X_train)
#y_train = y
X_test_scaled = scaler.transform(X_test)

dim1 = np.array([8,16,32,64,128,256])
dim2 = np.array([8,16,32,64,128,256])

test_error = []
names = []
for i in range(len(dim1)):
    for j in range(len(dim2)):
        for k in range(4):
            NN_model = Sequential()
            
            # The Input Layer :
            NN_model.add(Dense(dim1[i], kernel_initializer='normal',
                               input_dim=X_train_scaled.shape[1], activation='relu'))
            
            # The Hidden Layers :
            for l in range(k+1):
                NN_model.add(Dense(dim2[j], kernel_initializer='normal', activation='relu'))
            
            # The Output Layer :
            NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
            
            # Compile the network :
            NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                             metrics=['mean_absolute_error'])
            NN_model.summary()
            
            
            checkpoint_name = 'Weights-'+str(dim1[i])+'-'+str(dim2[j])+'-'+str(k+1)+'.hdf5'
            checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                         verbose=1, save_best_only=True, mode='auto')
            callbacks_list = [checkpoint]
            
            NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                         validation_split=0.2, callbacks=callbacks_list)

            print(checkpoint_name)
            model = load_model(checkpoint_name)
            predictions = model.predict(X_test_scaled)
            error = mean_absolute_error(y_test,predictions)
            test_error.append(error)
            names.append(checkpoint_name)

