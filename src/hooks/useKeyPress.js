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
    let loaded = false;
    if (!loaded) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
    loaded = true;
  }); // only run on mount
}
