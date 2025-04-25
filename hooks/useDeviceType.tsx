import { useState, useLayoutEffect } from "react";
import  debounce  from "debounce"; 

const useDeviceType = (breakpoints = { tablet: 700, desktop: 1200 }) => {
  const [isMobile, setMobile] = useState(window.innerWidth < breakpoints.tablet);
  const [isTablet, setTablet] = useState(
    window.innerWidth >= breakpoints.tablet && window.innerWidth < breakpoints.desktop
  );
  const [isDesktop, setDesktop] = useState(window.innerWidth >= breakpoints.desktop);

  useLayoutEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < breakpoints.tablet);
      setTablet(window.innerWidth >= breakpoints.tablet && window.innerWidth < breakpoints.desktop);
      setDesktop(window.innerWidth >= breakpoints.desktop);
    };

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
