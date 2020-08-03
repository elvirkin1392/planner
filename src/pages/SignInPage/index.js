import React, {useState} from "react";
import { Form } from "react-final-form";
import { TextField, makeValidate } from "mui-rff";
import { Typography, Button, Container, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import * as Yup from 'yup';

import {UserPool} from "UserPool.js";
import { actions as authActions } from "../../services/auth";

const schema = Yup.object().shape({
  email: Yup.string().email('Email is incorrect').required(),
  password: Yup.string().required()
});
const validate = makeValidate(schema);

function SignInPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  function onSubmit(values) {
    const user = new CognitoUser({
      Username: values.email,
      Pool: UserPool
    });
    
    const authDetails = new AuthenticationDetails({
      Username: values.email,
      Password: values.password
    });
    
    user.authenticateUser(authDetails, {
      onSuccess: data => {
        dispatch(
          authActions.login({
            email: values.email,
            userProfile: data.getAccessToken().payload,
            accessToken: data.getAccessToken().getJwtToken()
          })
        );
      },
      onFailure: err => {
        setError(err.message);
      },
      newPasswordRequired: (userAttributes) => {
        delete userAttributes.email_verified;
        user.completeNewPasswordChallenge(values.password, userAttributes, this);
      }
    });
  }

  
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ email: "", password: "" }}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Container maxWidth='xs' mx="auto">
            <Typography align='center'>Sign in</Typography>
            {error && <Typography align={'center'}>{error}</Typography>}
            <TextField
              type="email"
              label="Email"
              name="email"
            />
            <TextField
              type="password"
              label="Password"
              name="password"
            />
            <Box mt={2} display="flex" justifyContent="center">
              <Button type="submit" color="primary" variant="outlined">
                Sign in
              </Button>
            </Box>
          </Container>
        </form>
      )}
    />
  );
}

export default SignInPage;
