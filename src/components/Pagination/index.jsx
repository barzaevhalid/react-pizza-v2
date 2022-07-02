import React from 'react';
import ReactPaginate from 'react-paginate';

import s from './pagination.module.scss'
const Pagination = ({onChangePage}) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            pageRangeDisplayed={5}
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
