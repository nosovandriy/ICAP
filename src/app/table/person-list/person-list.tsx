import { useState } from 'react';

import { TableType } from '@/types/Table';
import { editTableItemOnServer } from '@/app/utils/api';
import { convertDateFormat } from '@/app/utils/format-birthday-date';

import style from './person-list.module.scss';

type Props = {
  person: TableType;
};

const PersonList: React.FC<Props> = ({ person }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(person);

  const handleEditTableItem = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    if (editedData.birthday_date) {
      const convertDate = convertDateFormat(editedData.birthday_date);
      const body = { ...editedData, birthday_date: convertDate };
      editTableItemOnServer(editedData.id, body);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData(person);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
            className={style.editInput}
          />
        ) : (
          <span>{editedData.name}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={editedData.email}
            onChange={handleInputChange}
            className={style.editInput}
          />
        ) : (
          <span>{editedData.email}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="birthday_date"
            value={editedData.birthday_date}
            onChange={handleInputChange}
            className={style.editInput}
          />
        ) : (
          <span>{editedData.birthday_date}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="phone_number"
            value={editedData.phone_number}
            onChange={handleInputChange}
            className={style.editInput}
          />
        ) : (
          <span>{editedData.phone_number}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={editedData.address}
            onChange={handleInputChange}
            className={style.editInput}
          />
        ) : (
          <span>{editedData.address}</span>
        )}
      </td>
      <td className={style.action}>
        {isEditing ? (
          <div className={style.actionButtons}>
            <button onClick={handleSaveEdit} className={`${style.button} ${style.saveButton}`}>
              Save
            </button>
            <button onClick={handleCancelEdit} className={`${style.button} ${style.cancelButton}`}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={handleEditTableItem} className={`${style.button} ${style.editButton}`}>
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default PersonList;
