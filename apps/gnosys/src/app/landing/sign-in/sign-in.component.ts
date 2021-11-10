import { Component, OnInit } from '@angular/core';
import { Credentials } from '@nocode/data-interfaces';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSignIn(credentials: Credentials) {
    console.log(credentials);
    const authenticationDetails = new AuthenticationDetails({
      Username: credentials.email,
      Password: credentials.password,
    });
    const poolData = {
      UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
      ClientId: environment.cognitoAppClientId, // Your client id here
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = { Username: credentials.email, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(result);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
      },
    });
  }
}
