# -*- coding: utf-8 -*-
"""
Created on Thu Dec  6 19:43:59 2018

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

vector_i = [3,7,10]
vector_i_2 = [2,3,5,7]
vector_j_1 = [3,7]
vector_j_2 = [5,6,7,8,9,10]

X = np.load("X.npy")
y = np.load("y.npy")

dim1 = np.array([32,64,128,128,128,128,256,256,256,256])
dim2 = np.array([256,128,64,256,256,256,64,128,256,256])
dim3 = np.array([3,3,4,2,3,4,3,4,1,2])

mabsval = []
names = []
scaler = StandardScaler()    
X_train,X_test,y_train,y_test = train_test_split(X,y,train_size=0.9,random_state=42)
scaler = StandardScaler()

for i in vector_i:
    X_aux_train = np.delete(X_train, i, 1)
    X_aux_test = np.delete(X_test, i, 1)
    X_train_scaled = scaler.fit_transform(X_aux_train)
    X_test_scaled = scaler.transform(X_aux_test)
    
    for k in range(len(dim1)):
        NN_model = Sequential()
        
        # The Input Layer :
        NN_model.add(Dense(dim1[k], kernel_initializer='normal',
                           input_dim=X_train_scaled.shape[1], activation='relu'))
        
        # The Hidden Layers :
        for l in range(dim3[k]):
            NN_model.add(Dense(dim2[k], kernel_initializer='normal', activation='relu'))
        
        # The Output Layer :
        NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
        
        # Compile the network :
        NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                         metrics=['mean_absolute_error'])
        NN_model.summary()
        
        
        checkpoint_name = 'Weights-'+str(dim1[k])+'-'+str(dim2[k])+'-'+str(dim3[k])+'-'+str(i+1)+'.hdf5'
        checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                     verbose=1, save_best_only=True, mode='auto')
        callbacks_list = [checkpoint]
        
        NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                     validation_split=0.2, callbacks=callbacks_list)
        
        model = load_model(checkpoint_name)
        predictions = NN_model.predict(X_test_scaled)
        error = mean_absolute_error(y_test, predictions)
        mabsval.append(error)
        names.append(checkpoint_name)

    
for i in vector_i_2:
    if i == 2:
        for j in vector_j_1:
            X_aux_train = np.delete(X_train, [i,j], 1)
            X_aux_test = np.delete(X_test, [i,j], 1)
            X_train_scaled = scaler.fit_transform(X_aux_train)
            X_test_scaled = scaler.transform(X_aux_test)
            
            for k in range(len(dim1)):
                NN_model = Sequential()
                
                # The Input Layer :
                NN_model.add(Dense(dim1[k], kernel_initializer='normal',
                                   input_dim=X_train_scaled.shape[1], activation='relu'))
                
                # The Hidden Layers :
                for l in range(dim3[k]):
                    NN_model.add(Dense(dim2[k], kernel_initializer='normal', activation='relu'))
                
                # The Output Layer :
                NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
                
                # Compile the network :
                NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                                 metrics=['mean_absolute_error'])
                NN_model.summary()
                
                
                checkpoint_name = 'Weights-'+str(dim1[k])+'-'+str(dim2[k])+'-'+str(dim3[k])+'-'+str(i+1)+'-'+str(j+1)+'.hdf5'
                checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                             verbose=1, save_best_only=True, mode='auto')
                callbacks_list = [checkpoint]
                
                NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                             validation_split=0.2, callbacks=callbacks_list)
                
                model = load_model(checkpoint_name)
                predictions = NN_model.predict(X_test_scaled)
                error = mean_absolute_error(y_test, predictions)
                mabsval.append(error)
                names.append(checkpoint_name) 
                
    elif i == 3:
        for j in vector_j_2:
            X_aux_train = np.delete(X_train, [i,j], 1)
            X_aux_test = np.delete(X_test, [i,j], 1)
            X_train_scaled = scaler.fit_transform(X_aux_train)
            X_test_scaled = scaler.transform(X_aux_test)
            
            for k in range(len(dim1)):
                NN_model = Sequential()
                
                # The Input Layer :
                NN_model.add(Dense(dim1[k], kernel_initializer='normal',
                                   input_dim=X_train_scaled.shape[1], activation='relu'))
                
                # The Hidden Layers :
                for l in range(dim3[k]):
                    NN_model.add(Dense(dim2[k], kernel_initializer='normal', activation='relu'))
                
                # The Output Layer :
                NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
                
                # Compile the network :
                NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                                 metrics=['mean_absolute_error'])
                NN_model.summary()
                
                
                checkpoint_name = 'Weights-'+str(dim1[k])+'-'+str(dim2[k])+'-'+str(dim3[k])+'-'+str(i+1)+'-'+str(j+1)+'.hdf5'
                checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                             verbose=1, save_best_only=True, mode='auto')
                callbacks_list = [checkpoint]
                
                NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                             validation_split=0.2, callbacks=callbacks_list)
                
                model = load_model(checkpoint_name)
                predictions = NN_model.predict(X_test_scaled)
                error = mean_absolute_error(y_test, predictions)
                mabsval.append(error)
                names.append(checkpoint_name) 
            
            
    elif i == 5:
        j = 6
        X_aux_train = np.delete(X_train, [i,j], 1)
        X_aux_test = np.delete(X_test, [i,j], 1)
        X_train_scaled = scaler.fit_transform(X_aux_train)
        X_test_scaled = scaler.transform(X_aux_test)
        
        for k in range(len(dim1)):
            NN_model = Sequential()
            
            # The Input Layer :
            NN_model.add(Dense(dim1[k], kernel_initializer='normal',
                               input_dim=X_train_scaled.shape[1], activation='relu'))
            
            # The Hidden Layers :
            for l in range(dim3[k]):
                NN_model.add(Dense(dim2[k], kernel_initializer='normal', activation='relu'))
            
            # The Output Layer :
            NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
            
            # Compile the network :
            NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                             metrics=['mean_absolute_error'])
            NN_model.summary()
            
            
            checkpoint_name = 'Weights-'+str(dim1[k])+'-'+str(dim2[k])+'-'+str(dim3[k])+'-'+str(i+1)+'-'+str(j+1)+'.hdf5'
            checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                         verbose=1, save_best_only=True, mode='auto')
            callbacks_list = [checkpoint]
            
            NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                         validation_split=0.2, callbacks=callbacks_list)
            
            model = load_model(checkpoint_name)
            predictions = NN_model.predict(X_test_scaled)
            error = mean_absolute_error(y_test, predictions)
            mabsval.append(error)
            names.append(checkpoint_name)
                
    else:
        j = 10
        X_aux_train = np.delete(X_train, [i,j], 1)
        X_aux_test = np.delete(X_test, [i,j], 1)
        X_train_scaled = scaler.fit_transform(X_aux_train)
        X_test_scaled = scaler.transform(X_aux_test)
        
        for k in range(len(dim1)):
            NN_model = Sequential()
            
            # The Input Layer :
            NN_model.add(Dense(dim1[k], kernel_initializer='normal',
                               input_dim=X_train_scaled.shape[1], activation='relu'))
            
            # The Hidden Layers :
            for l in range(dim3[k]):
                NN_model.add(Dense(dim2[k], kernel_initializer='normal', activation='relu'))
            
            # The Output Layer :
            NN_model.add(Dense(1, kernel_initializer='normal', activation='linear'))
            
            # Compile the network :
            NN_model.compile(loss='mean_absolute_error', optimizer='adam',
                             metrics=['mean_absolute_error'])
            NN_model.summary()
            
            
            checkpoint_name = 'Weights-'+str(dim1[k])+'-'+str(dim2[k])+'-'+str(dim3[k])+'-'+str(i+1)+'-'+str(j+1)+'.hdf5'
            checkpoint = ModelCheckpoint(checkpoint_name, monitor='val_loss',
                                         verbose=1, save_best_only=True, mode='auto')
            callbacks_list = [checkpoint]
            
            NN_model.fit(X_train_scaled, y_train, epochs=200, batch_size=32,
                         validation_split=0.2, callbacks=callbacks_list)
            
            model = load_model(checkpoint_name)
            predictions = NN_model.predict(X_test_scaled)
            error = mean_absolute_error(y_test, predictions)
            mabsval.append(error)
            names.append(checkpoint_name)
        
            