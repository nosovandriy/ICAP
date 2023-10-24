import { LoginType } from '@/types/Login';
import { TableType } from '@/types/Table';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function validateUser(inputsData: LoginType) {
  const response = await fetch(`${BASE_URL}api/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputsData),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
}

export async function fetchTableData(page: string = '') {
  const response = await fetch(`${BASE_URL}api/table/?limit=10&${page}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();

  return data;
}

export async function editTableItemOnServer(id: number, body: TableType) {
  const response = await fetch(`${BASE_URL}api/table/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}
