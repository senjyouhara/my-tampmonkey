import React, { useState } from "react";
import s from "./index.less";
import Menus from "./components/menus";
console.log(s, "s");
const App = (props) => {
  const [shrink, setShrink] = useState(true);

  const style = {
    left: shrink ? "-300px" : "0",
  };

  return (
    <div className={s.app} style={style}>
      <div onClick={() => setShrink(!shrink)} className={s.float}>
        {shrink ? "展开" : "收缩"}
      </div>
      <Menus />
    </div>
  );
};

export default App;
