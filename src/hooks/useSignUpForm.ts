import { useState } from 'react';
import { INITIAL_SIGNUP_FORM, SignUpFormState } from '@appTypes/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignUpErrors = Partial<Record<keyof SignUpFormState, string>>;

export const useSignUpForm = (onSubmit: (data: SignUpFormState) => Promise<void>) => {
  const [formData, setFormData] = useState<SignUpFormState>(INITIAL_SIGNUP_FORM);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof SignUpFormState, value: string): string => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required.';
        return '';
      case 'lastName':
        if (!value.trim()) return 'Last name is required.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address.';
        return '';
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters.';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof SignUpFormState, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const fieldError = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: fieldError }));
  };

  const validateAll = (): boolean => {
    const newErrors: SignUpErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof SignUpFormState>).forEach(field => {
      const fieldError = validateField(field, formData[field]);
      if (fieldError) {
        newErrors[field] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;
    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.length >= 6 &&
    !Object.values(errors).some(Boolean);

  return {
    formData,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
    isFormValid,
  };
};
