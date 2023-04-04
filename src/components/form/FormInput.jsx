import React from 'react';
import { useField } from 'formik';
import FormErrorV2 from './FormErrorV2';
import Input from '../input/Input';

const FormInput = ({
  ariaLabel,
  name,
  type,
  placeholder
}) => {
  const [field, meta] = useField(name);
  return (
    <>
      <Input
        field={field}
        ariaLabel={ariaLabel}
        name={field.name}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <FormErrorV2 text={meta.error}></FormErrorV2>
      ) : null}
    </>
  );
};

export default FormInput;
