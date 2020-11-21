import React from "react";

const PropsLogger = (props) => {
  return <div>{React.cloneElement(props.children, props)}</div>;
};

export default PropsLogger;
