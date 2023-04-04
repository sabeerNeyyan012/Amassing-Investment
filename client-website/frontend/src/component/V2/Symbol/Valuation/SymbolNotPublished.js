import React from 'react';

const SymbolNotPublished = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '450px'
      }}
    >
      <h3>The Report has not been published yet.</h3>
      <br />
      <div>
        <button className='btn btn-primary'>Request Report</button>
      </div>
    </div>
  )
};

export default SymbolNotPublished;
