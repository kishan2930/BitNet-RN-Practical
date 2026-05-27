import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useForgotPasswordForm = (onSubmit: (email: string) => Promise<void>) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!validate(email)) return;
    try {
      setLoading(true);
      await onSubmit(email.trim());
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    error,
    loading,
    handleEmailChange,
    handleSubmit,
    isValid: email.trim() !== '' && !error,
  };
};
