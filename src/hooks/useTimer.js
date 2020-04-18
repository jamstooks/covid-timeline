import { useState, useEffect, useRef } from "react";

const useTimer = ({ callback, delay = 400, active = false }) => {
  const [isActive, setIsActive] = useState(active);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let interval = null;
    if (isActive) {
      interval = setInterval(tick, delay);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, delay]);

  return [isActive, toggle];
};

export default useTimer;
