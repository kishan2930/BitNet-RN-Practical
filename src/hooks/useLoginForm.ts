import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLoginForm = (onSuccess: (email: string) => void) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = (value: string): boolean => {
    if (!value.trim()) {
      setError('Email address is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      validate(value);
    }
  };

  const handleSubmit = () => {
    if (validate(email)) {
      onSuccess(email.trim());
    }
  };

  return {
    email,
    error,
    handleEmailChange,
    handleSubmit,
    isValid: email.trim() !== '' && !error,
  };
};
