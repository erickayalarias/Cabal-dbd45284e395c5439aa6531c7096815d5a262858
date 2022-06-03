import { TextField } from '@mui/material';
import { useField } from 'formik';

const TextfieldWrapper = ({ name, ...otherProps }) => {
  const [field, mData] = useField(name);
  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };

  if (mData && mData.error && mData.touched) {
    configTextfield.error = true;
    configTextfield.helperText = mData.error;
  }
  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
