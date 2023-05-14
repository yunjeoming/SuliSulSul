import { ChangeEvent, useState } from 'react';

const useInput: (
  input: string | undefined,
) => [string, (e: ChangeEvent) => void, React.Dispatch<React.SetStateAction<string>>] = (
  input: string | undefined = '',
) => {
  const [value, setValue] = useState(input);
  const handler = (e: ChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };
  return [value, handler, setValue];
};

export default useInput;
