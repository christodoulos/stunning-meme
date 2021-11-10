import { Injectable } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { AwsPool } from '@nocode/data-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AwsAuthService {
  constructor() {}

  isLoggedIn(poolData: AwsPool): boolean {
    let isAuthenticated = false;
    const userPool = new CognitoUserPool(poolData);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err: Error, session: any) => {
        console.log(session);
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        isAuthenticated = session.isValid();
      });
    }
    return isAuthenticated;
  }
}
