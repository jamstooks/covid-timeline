import { useEffect } from "react";

export default function useKeyPress(keyFuncs) {
  const onKeyDown = (event) => {
    const { keyCode } = event;

    if (keyCode in keyFuncs) {
      keyFuncs[keyCode]();
    }
    event.stopPropagation();
  };

  useEffect(() => {
    window.removeEventListener("keydown", onKeyDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }); // only run on mount
}
