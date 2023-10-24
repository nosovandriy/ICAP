'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/types/ReduxHooks';
import { TableType } from '@/types/Table';
import Pagination from '../components/pagination/pagination';
import Loading from '../loading';
import { setNextPage, setPrevPage, setTableData, setTotalCount } from '../redux/slices/usersSlice';
import { fetchTableData } from '../utils/api';
import PersonList from './person-list/person-list';

import style from './page.module.scss';

const Table = () => {
  const { authorization, tableData } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchDataFromServer = async (page: string = '') => {
    try {
      const data = await fetchTableData(page);

      dispatch(setTableData(data.results));
      dispatch(setTotalCount(data.count));
      dispatch(setNextPage(data.next));
      dispatch(setPrevPage(data.previous));
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    if (!authorization) {
      router.push('/');
    } else {
      fetchDataFromServer();
    }
  }, []);

  return (
    <div className={style.wrapper}>
      {tableData.length > 0 ? (
        <>
          <table className={style.personTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((person: TableType) => (
                <PersonList person={person} key={person.id} />
              ))}
            </tbody>
          </table>
          <Pagination fetchData={fetchDataFromServer} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Table;
