import React from 'react';

import { useAppDispatch, useAppSelector } from '@/types/ReduxHooks';
import { extractPage } from '@/app/utils/get-page-count';
import { setCurrentPage } from '@/app/redux/slices/usersSlice';

import style from './pagination.module.scss';

type Props = {
  fetchData: (page?: string) => void;
};

const Pagination: React.FC<Props> = ({ fetchData }) => {
  const { currentPage, totalCount, nextPage, prevPage } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const pagesQuantity = Math.ceil(totalCount / 10);
  const pagesList = Array.from({ length: pagesQuantity }, (_, index) => index + 1);

  const handleLoadNextPage = () => {
    const page = extractPage(nextPage);
    const pageData = `offset=${page}`;

    fetchData(pageData);
    if (page) {
      const selectedPage = Math.ceil((parseInt(page) + 1) / 10);

      dispatch(setCurrentPage(selectedPage));
    }
  };

  const handleLoadPrevPage = () => {
    const page = extractPage(prevPage);
    const pageData = `offset=${page}`;

    fetchData(pageData);
    if (page) {
      const selectedPage = Math.ceil((parseInt(page) + 1) / 10);
      fetchData(pageData);

      dispatch(setCurrentPage(selectedPage));
    } else {
      fetchData();
      dispatch(setCurrentPage(1));
    }
  };

  const handlePageClick = (page: number) => {
    const offset = (page - 1) * 10;
    const pageData = `offset=${offset}`;
    fetchData(pageData);
    dispatch(setCurrentPage(page));
  };
  return (
    <div className={style.pagination}>
      <button
        className={style.loadButton}
        onClick={handleLoadPrevPage}
        disabled={prevPage === null}
      >
        <span>{'<<'}</span>
      </button>
      {pagesList.map((page) => (
        <button
          className={`${style.numberButton} ${currentPage === page ? style.activePage : ''}`}
          onClick={() => handlePageClick(page)}
          key={page}
        >
          {page}
        </button>
      ))}
      <button
        className={style.loadButton}
        onClick={handleLoadNextPage}
        disabled={nextPage === null}
      >
        <span>{'>>'}</span>
      </button>
    </div>
  );
};

export default Pagination;
