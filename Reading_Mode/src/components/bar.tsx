import { locals } from '../index.css';
import React from 'react';

interface BarProps {
  onEnter: () => void;
  onClose: () => void;
}

const Bar = (props: BarProps) => {
  return (
    <div className={locals.bar}>
      <button onClick={props.onEnter}>进入阅读模式</button>
      <button onClick={props.onClose}>关闭</button>
    </div>
  )
}

export default Bar;