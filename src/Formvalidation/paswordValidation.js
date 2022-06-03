import * as Yup from 'yup';
import { setPass } from '../features/session';
import { SHA256, AES } from 'crypto-js';

export const INITIAL_FORM_STATE_UserPass = {
  password: '',
};

export const FORM_VALIDATION_SCHEMA_UserPass = Yup.object().shape({
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Put the same password as before.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const onSubmitPass = async (
  values,
  actions,
  dispatch,
  navigate
) => {
  let privateKey = SHA256(values.password).toString();
  values.password = AES.encrypt(
    values.password,
    privateKey
  ).toString();
  window.localStorage.setItem('cabal_password', values.password);
  window.localStorage.setItem('cabal_privateKey', privateKey);
  dispatch(setPass( privateKey));
  navigate('/auth');
};
