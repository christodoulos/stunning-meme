import { Component, OnInit } from '@angular/core';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { User } from '@nocode/data-interfaces';
import { environment } from '../../../environments/environment';

interface cognitoInterface {
  name: string;
  family_name: string;
  email: string;
  [key: string]: string;
}

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSignUp(user: User) {
    const poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId,
    };
    const awsData: cognitoInterface = {
      name: user.firstName,
      family_name: user.lastName,
      email: user.email,
    };
    console.log('awsData', awsData);
    const userPool = new CognitoUserPool(poolData);
    const attributeList = [];
    let key: keyof typeof awsData;
    for (key in awsData) {
      console.log(key, awsData[key]);
      const attrData = { Name: key, Value: awsData[key] };
      const attribute = new CognitoUserAttribute(attrData);
      attributeList.push(attribute);
    }

    userPool.signUp(
      user.email,
      user.password,
      attributeList,
      [],
      (err, result) => {
        console.log(result);
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
      }
    );
  }
}
