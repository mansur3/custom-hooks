import { useState, useEffect } from "react";

export const useNotification = () => {
  const [success, setSuccess] = useState(true);
  const [failure, setFailure] = useState(true);

  const successNotification = (message, time) => {
    if (success) {
      alert(message);
    }

    const timer = setTimeout(() => {
      setSuccess(false);
    }, time);
    return () => clearTimeout(timer);
  };

  const failureNotification = (message, time) => {
    if (failure) {
      alert(message);
    }
    const timera = setTimeout(() => {
      setFailure(false);
    }, time);
    return () => clearTimeout(timera);
  };
  useEffect(() => {
    failureNotification();
    successNotification();
  }, []);

  return { failureNotification, successNotification };
};
