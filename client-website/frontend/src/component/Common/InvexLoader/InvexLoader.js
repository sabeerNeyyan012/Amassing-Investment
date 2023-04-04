import React from 'react';
import invexLoader from '../../Common/Images/invexLoader.gif';

const InvexLoader = ({ height }) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: height }}
    >
      <img src={invexLoader} style={{ height: '100px' }} />
    </div>
  );
};

export default InvexLoader;
