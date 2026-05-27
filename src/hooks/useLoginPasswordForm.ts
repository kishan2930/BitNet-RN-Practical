import { useState } from 'react';

export const useLoginPasswordForm = (onSubmit: (password: string) => Promise<void>) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const validate = (value: string): boolean => {
    if (!value) {
      setError('Password is required.');
      return false;
    }
    if (value.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (error) {
      validate(value);
    }
  };

  const handleSubmit = async () => {
    if (!validate(password)) return;
    try {
      setLoading(true);
      await onSubmit(password);
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    error,
    loading,
    handlePasswordChange,
    handleSubmit,
    isValid: password.length >= 6 && !error,
  };
};
