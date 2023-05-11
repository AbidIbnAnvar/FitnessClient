import React, { useState, useEffect } from "react";

import "./index.css";

const GoTop = (props) => {
  return (
    <>
      <div className={props.showGoTop} onClick={props.scrollUp}>
          <h1>Top</h1>
      </div>
    </>
  );
};
export default GoTop;