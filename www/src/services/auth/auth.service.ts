import { BehaviorSubject } from 'rxjs';

import { authedFetch } from '../authed-fetch';

export interface UserData {
  email: string;
  id: string;
  name: string;
}

export interface AnonymousUser {
  email: null;
  id: null;
  name: 'anonymous_user';
}

export interface ErrorWhoAmI {
  errors: string[];
  result: null;
}

export interface LoggedWhoAmI {
  errors: null;
  result: UserData;
}

export interface AnonymousWhoAmI {
  errors: null;
  result: AnonymousUser;
}

export type WhoAmIResponse = ErrorWhoAmI | LoggedWhoAmI | AnonymousWhoAmI;

export interface AuthenticationError {
  errors: string[];
  results: null;
}

export interface AuthenticationSuccess {
  errors: null;
  results: {
    access_token: string;
  };
}

export type AuthenticationResponse =
  | AuthenticationError
  | AuthenticationSuccess;

export interface CreateUserParams {
  email: string;
  name: string;
  password: string;
}

declare var BASE_API_PATH: string;

/**
 * Service to abstract the Auth management
 */
export class AuthService {
  public userData$ = new BehaviorSubject<UserData | null>(null);

  private _tokenKey = 'access_token';

  public set token(token: string | null) {
    if (token) {
      localStorage.setItem(this._tokenKey, token);
    } else {
      localStorage.removeItem(this._tokenKey);
    }
  }

  public get token() {
    return localStorage.getItem(this._tokenKey) || null;
  }

  constructor() {
    this.getUserData().then(data => {
      if (data.id) {
        this.userData$.next(data);
      }
    });
  }

  public verifyToken() {
    if (!this.token) {
      return null;
    }

    try {
      const claims = JSON.parse(atob(this.token.split('.')[1]));
      const now = new Date().getTime() / 1000;
      if (claims.exp > now) {
        return claims;
      }
      this.token = null;
    } catch {
      //
    }

    if (!this.userData$.getValue()) {
      this.userData$.next(null);
    }
    return null;
  }

  public async getUserData(): Promise<UserData | AnonymousUser> {
    if (this.verifyToken()) {
      if (this.userData$.getValue()) {
        return Promise.resolve(this.userData$.getValue());
      }

      const response = await authedFetch(
        `${BASE_API_PATH || ''}/api/v1/user/whoami`,
      );
      const data: WhoAmIResponse = await response.json();
      if (data.errors || data.result.id === null) {
        console.error(data.errors);
        return this.anonymousUserFactory();
      }

      this.userData$.next(data.result);
      return data.result;
    }

    return Promise.resolve({ id: null, email: null, name: 'anonymous_user' });
  }

  public async authenticate(email: string, password: string) {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);

    const response = await authedFetch(
      `${BASE_API_PATH || ''}/api/v1/user/login`,
      {
        body,
        method: 'POST',
      },
    );

    const data: AuthenticationResponse = await response.json();
    if (data.errors) {
      this.token = null;
    } else {
      this.token = data.results.access_token;
    }
    return data;
  }

  public logOut() {
    this.token = null;
    this.userData$.next(null);
  }

  public async createUser({ email, name, password }: CreateUserParams) {
    const body = new FormData();
    body.append('email', email);
    body.append('name', name);
    body.append('password', password);

    const response = await authedFetch(`${BASE_API_PATH || ''}/api/v1/user`, {
      body,
      method: 'POST',
    });

    const data: AuthenticationResponse = await response.json();
    if (data.errors) {
      this.token = null;
    } else {
      this.token = data.results.access_token;
    }
    return data;
  }

  private anonymousUserFactory() {
    return Promise.resolve({ id: null, email: null, name: 'anonymous_user' });
  }
}

export const authService = new AuthService();
