# -*- coding: utf-8 -*-
"""
Created on Fri Nov 16 15:54:51 2018

@author: User
"""

from sklearn import metrics
import numpy as np
from sklearn import model_selection
from sklearn.preprocessing import StandardScaler
from sklearn.base import BaseEstimator
import scipy.spatial.distance as distance


<<<<<<< HEAD
X = np.load("C:/Users/User/Documents/GitHub/iDEALParking/ideal_parking/Analytics_data/X.npy")
y = np.load("C:/Users/User/Documents/GitHub/iDEALParking/ideal_parking/Analytics_data/y.npy")

scaler = StandardScaler()
X_train,X_val,y_train,y_val = model_selection.train_test_split(X,y,train_size=0.8,random_state=42)
=======
X = np.load(
    "C:/Users/User/Documents/GitHub/iDEALParking/ideal_parking/Analytics_data/X.npy")
y = np.load(
    "C:/Users/User/Documents/GitHub/iDEALParking/ideal_parking/Analytics_data/y.npy")

scaler = StandardScaler()
X_train, X_val, y_train, y_val = model_selection.train_test_split(
    X, y, train_size=0.8, random_state=42)
>>>>>>> a0e7209cf43543508029ccd32bfd8f023e6a3043
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)


<<<<<<< HEAD
def gaussian_covariance(a,b,l,s):
    d = distance.cdist(a,b,metric='seuclidean',V=l)
    return s*np.exp(-0.5*d*d)

class GaussianProcess(BaseEstimator):
    def __init__(self,sigma_noise=0.01,covariance = None, arguments = None):
        '''l: is a vector of the scale for each dimension'''
        self.sigma_noise=sigma_noise
        self.covariance = covariance
        self.args = arguments
    
    def fit(self,X,y):
        self.X=X
        self.y=y
        A = self.covariance(self.X,self.X,**self.args)
        self.Ai = np.linalg.inv(A+self.sigma_noise*np.eye(A.shape[0]))
    
    def predict(self,X):
        B = self.covariance(X,self.X,**self.args).T
        C = self.covariance(X,X,**self.args)
        self.mu = np.dot(np.dot(B.T,self.Ai),self.y)
        return self.mu
    
    def predict_proba(self,X):     
        B = self.covariance(X,self.X,**self.args).T
        C = self.covariance(X,X,**self.args)
        self.mu = np.dot(np.dot(B.T,self.Ai),self.y)
        self.cov = C - np.dot(np.dot(B.T,self.Ai),B)
        return  self.mu,np.diag(self.cov)
    
print('DONE')

## Gaussian Covariance
gp = GaussianProcess(sigma_noise=1e-4,covariance=gaussian_covariance, arguments = {'l':10*np.ones((8)),'s':1.})
gp.fit(X_train_scaled,y_train)
f,c = gp.predict_proba(X_val_scaled)
f_max = f.ravel() + 2*np.sqrt(c)
f_min = f.ravel() - 2*np.sqrt(c)

print('Gaussian kernel')
print('Mean Absolute Error:', metrics.mean_absolute_error(y_val, f))  
print('Mean Squared Error:', metrics.mean_squared_error(y_val, f))  
print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_val, f)))


#plt.show()

#plt.plot(f,'r.')
=======
def gaussian_covariance(a, b, l, s):
    d = distance.cdist(a, b, metric='seuclidean', V=l)
    return s * np.exp(-0.5 * d * d)


class GaussianProcess(BaseEstimator):
    def __init__(self, sigma_noise=0.01, covariance=None, arguments=None):
        '''l: is a vector of the scale for each dimension'''
        self.sigma_noise = sigma_noise
        self.covariance = covariance
        self.args = arguments

    def fit(self, X, y):
        self.X = X
        self.y = y
        A = self.covariance(self.X, self.X, **self.args)
        self.Ai = np.linalg.inv(A + self.sigma_noise * np.eye(A.shape[0]))

    def predict(self, X):
        B = self.covariance(X, self.X, **self.args).T
        self.mu = np.dot(np.dot(B.T, self.Ai), self.y)
        return self.mu

    def predict_proba(self, X):
        B = self.covariance(X, self.X, **self.args).T
        C = self.covariance(X, X, **self.args)
        self.mu = np.dot(np.dot(B.T, self.Ai), self.y)
        self.cov = C - np.dot(np.dot(B.T, self.Ai), B)
        return self.mu, np.diag(self.cov)


print('DONE')

# Gaussian Covariance
gp = GaussianProcess(sigma_noise=1e-4, covariance=gaussian_covariance,
                     arguments={'l': 10 * np.ones((8)), 's': 1.})
gp.fit(X_train_scaled, y_train)
f, c = gp.predict_proba(X_val_scaled)
f_max = f.ravel() + 2 * np.sqrt(c)
f_min = f.ravel() - 2 * np.sqrt(c)

print('Gaussian kernel')
print('Mean Absolute Error:', metrics.mean_absolute_error(y_val, f))
print('Mean Squared Error:', metrics.mean_squared_error(y_val, f))
print('Root Mean Squared Error:', np.sqrt(metrics.mean_squared_error(y_val, f)))


# plt.show()

# plt.plot(f,'r.')
>>>>>>> a0e7209cf43543508029ccd32bfd8f023e6a3043
