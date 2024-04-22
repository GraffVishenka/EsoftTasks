import { useState } from "react";

export default function useInput(initialValue:string) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e:React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    onChange,
  };
}