import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserLevel, updateUserLevel } from '../../../store/action/userLevels';

const UserLevelForm = ({ userLevel, setIsEditing }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(userLevel ? userLevel.name : '');
  const [minPoint, setMinPoint] = useState(userLevel ? userLevel.minPoint : '');
  const [discount, setDiscount] = useState(userLevel ? userLevel.discount : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserLevel = { name, minPoint, discount };
    if (userLevel) {
      dispatch(updateUserLevel({ ...newUserLevel, id: userLevel.id }));
      setIsEditing(false);
    } else {
      dispatch(addUserLevel(newUserLevel));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="minPoint">Min Point:</label>
        <input
          type="number"
          id="minPoint"
          value={minPoint}
          onChange={(e) => setMinPoint(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          step="0.01"
          id="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          required
        />
      </div>
      <button type="submit">{userLevel ? 'Update' : 'Add'}</button>
      {userLevel && (
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default UserLevelForm;
