import { useState, useCallback } from "react";

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((forcedValue) => {
    setValue((prev) =>
      typeof forcedValue === "boolean" ? forcedValue : !prev,
    );
  }, []);

  return [value, toggle];
};
