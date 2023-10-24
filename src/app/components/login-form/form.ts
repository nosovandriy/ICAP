import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const validation = yup.object({
  username: yup
    .string()
    .required('This field is required!')
    .max(50, 'Max 30 characters')
    .min(2, 'Min 2 characters'),
  password: yup
    .string()
    .required('This field is required!')
    .min(8, 'Password must contain min 8 characters')
    .minNumbers(1, 'password must contain at least 1 number'),
});
