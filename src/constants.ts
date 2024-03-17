import * as yup from 'yup';

export const page1 = 'page1';
export const page2 = 'page2';

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Name must only contain letters')
    .required('Name is a required field'),
});
