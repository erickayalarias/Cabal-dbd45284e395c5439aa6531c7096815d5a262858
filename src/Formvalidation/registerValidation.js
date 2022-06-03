import * as Yup from 'yup';
import { creaChatUser } from '../features/chat';
import { setPass, singUser } from '../features/session';
import { SHA256, AES, enc } from 'crypto-js';
import { getGandP } from '../helper/functions/encryptChat';

export const INITIAL_FORM_STATE = {
  alias: '',
  password: '',
};

export const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  alias: Yup.string().required('Alias is required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

export const onSubmitRegistered = async (
  values,
  dispatch,
  publicKey,
  navigate
) => {
  let privateKey = SHA256(values.password).toString();
  values.password = AES.encrypt(
    values.password,
    privateKey
  ).toString();
  window.localStorage.setItem('cabal_password', values.password);
  window.localStorage.setItem('cabal_privateKey', privateKey);
  dispatch(setPass(privateKey));
  const userChat = {
    name: values.alias,
    publicKey: publicKey,
    GandP: getGandP(privateKey),
    avatar: `https://avatars.dicebear.com/api/personas/${values.alias}.svg`,
  };
  
  //TODO set tiene que registrar
  const bodyParameters = {
    publicKey: publicKey,
    alias: values.alias,
    uid: publicKey, //encrypt
    password: values.password,
    avatar: `https://avatars.dicebear.com/api/personas/${values.alias}.svg`,
  };
  await dispatch(singUser(bodyParameters));
  await dispatch(creaChatUser(userChat));

  window.location.href = '/news';
};
