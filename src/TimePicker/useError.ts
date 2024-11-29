import { useEffect, useState } from 'react';

import { ITimePickerValue } from '../types';

interface IUseError {
  (externalError?: Partial<ITimePickerValue<string>>): {
    error: Partial<ITimePickerValue<string>>;
    handleError(arg?: Partial<ITimePickerValue<string>>): void;
  };
}

const DEFAULT_ERROR = {
  date: '',
  time: '',
};

export const useError: IUseError = (externalError = DEFAULT_ERROR) => {
  const [error, setError] = useState(externalError);

  useEffect(() => {
    setError(externalError);
  }, [externalError]);

  const handleError = ({ date = '', time = '' }: Partial<ITimePickerValue<string>> = DEFAULT_ERROR) => {
    const resultError = {
      date: date || externalError?.date || '',
      time: time || externalError?.time || '',
    };

    setError(resultError);
  };

  return { error, handleError };
};
