import React from "react";

import s from "./notFoundBlock.module.scss";
const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={s.root}>
      <span className={s.errorType}>#404</span>
      <div>Ничего не найдено</div>
    </h1>
  );
};

export default NotFoundBlock;
