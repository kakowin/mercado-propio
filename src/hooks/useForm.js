import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value, files } = target;
    if (files) {
      setFormState({
        ...formState,
        [name]: files[0],
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};
