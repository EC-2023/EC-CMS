import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserLevel } from '../redux/slices/userLevelsSlice';
import UserLevelForm from './UserLevelForm';

const UserLevelItem = ({ userLevel }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteUserLevel(id));
  };

  return (
    <div>
      {isEditing ? (
        <UserLevelForm userLevel={userLevel} setIsEditing={setIsEditing} />
      ) : (
        <>
          <div>ID: {userLevel.id}</div>
          <div>Name: {userLevel.name}</div>
          <div>Min Point: {userLevel.minPoint}</div>
          <div>Discount: {userLevel.discount}</div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(userLevel.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default UserLevelItem;
