"use client";

import { useState, useLayoutEffect } from "react";
import debounce from "debounce";

const useDeviceType = (breakpoints = { tablet: 700, desktop: 1200 }) => {
  const [isMobile, setMobile] = useState(false);
  const [isTablet, setTablet] = useState(false);
  const [isDesktop, setDesktop] = useState(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      const width = window.innerWidth;
      setMobile(width < breakpoints.tablet);
      setTablet(width >= breakpoints.tablet && width < breakpoints.desktop);
      setDesktop(width >= breakpoints.desktop);
    };
    handleResize();
    
    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [breakpoints]);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

export default useDeviceType;
