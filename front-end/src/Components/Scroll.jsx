// // src/Components/ScrollToTop.jsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const Scroll = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // This forces the window to go to the top
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth", // This makes it smooth
//     });
//   }, [pathname]); // This runs every time the page path changes

//   return null;
// };

// export default Scroll;


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use "instant" because "smooth" can sometimes cause 
    // the page to scroll while the transition is happening
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
  }, [pathname]);

  return null;
};

export default Scroll;