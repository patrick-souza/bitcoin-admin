import React, { memo, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import Form from 'App/Components/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Context from '../Context';

type IFormValues = {
  username: string;
  password: string;
};
function AuthForm() {
  const { setShowRegister } = useContext(Context);

  const formik = useFormik<IFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    }),
    onSubmit: values => console.log(values),
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextField
        name="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        label="Username"
        error={!!formik.errors.username}
        helperText={formik.errors.username}
      />
      <TextField
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        variant="outlined"
        label="Password"
        type="password"
        error={!!formik.errors.password}
        helperText={formik.errors.password}
      />
      <Typography align="center">
        Ainda não é cadastrado ?
        <Button color="primary" onClick={() => setShowRegister(true)}>
          Cadastre-se
        </Button>
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => formik.submitForm()}
      >
        Entrar
      </Button>
    </Form>
  );
}
export default memo(AuthForm);
