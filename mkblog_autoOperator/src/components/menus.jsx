import React, { useState, useMemo } from "react";
import s from "./index.less";
import { Switch } from "antd";
import "antd/es/switch/style/index.css";

export default function Menus(props) {
  const [state, setState] = useState({
    firewood: false,
    wood: false,
    trap: false,
  });
  const timer = useMemo(() => {
    return {
      firewood: null,
      wood: null,
      trap: null,
    };
  });

  const data = {
    firewood: {
      id: 1,
      title: "自动添加柴火",
      selector: "#stokeButton",
    },
    wood: {
      id: 2,
      title: "自动收集木头",
      selector: "#gatherButton",
    },
    trap: {
      id: 3,
      title: "自动查看陷阱",
      selector: "#trapsButton",
    },
  };

  function itemHandler(key) {
    const item = data[key];
    clearInterval(timer[key]);
    timer[key] = setInterval(() => {
      console.log(state, "state");
      if (!state[key]) {
        clearInterval(timer[key]);
      }

      const dom = document.querySelector(item.selector);
      const flag = dom?.classList?.contains("disabled");
      if (!flag) {
        dom.click();
      }
    }, 300);
  }

  return (
    <div className={s.menus}>
      {Object.keys(data).map((v) => {
        return (
          <div key={data[v].id} className={s.menu}>
            <span className={s.menuTitle}>{data[v].title}</span>
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              onChange={(e) => {
                const data = { ...state };
                data[v] = e;
                setState(data);
                setTimeout(() => {
                  itemHandler(v);
                });
              }}
              checked={state[v]}
            />
          </div>
        );
      })}
    </div>
  );
}
