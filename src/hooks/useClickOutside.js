import { useEffect } from "react";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // If ref is not set or click is inside the element, do nothing
      if (!ref.current || ref.current.contains(event.target)) return;

      // Otherwise call the handler (close dropdown)
      handler(event);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
