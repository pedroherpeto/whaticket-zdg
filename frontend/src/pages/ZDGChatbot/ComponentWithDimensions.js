import React, { useRef, useEffect, useState } from "react";

const ComponentWithDimensions = props => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  return (
    <div ref={targetRef}>
      <p>{dimensions.width}</p>
      <p>{dimensions.height}</p>
    </div>
  );
};

export default ComponentWithDimensions;
