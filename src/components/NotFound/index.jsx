import React from 'react';
import s from './notFoundBlock.module.scss'
const NotFoundBlock = () => {
    return (
        <div className={s.root}>
          <h1>
            Ничего не найдено :(
              <span>123</span>
          </h1>
        </div>
    );
};

export default NotFoundBlock;
