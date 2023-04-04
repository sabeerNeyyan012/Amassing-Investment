import React from 'react';

const AddScreener = ({ onClose }) => {
  return (
    <div
      class='modal fade'
      id='exampleModalCenter'
      tabindex='-1'
      role='dialog'
      aria-labelledby='exampleModalCenterTitle'
      aria-hidden='true'
    >
      <div class='modal-dialog modal-dialog-centered' role='document'>
        <div class='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='screenermodalLabel'>
              Save Screener
            </h5>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={() => {
                onClose();
              }}
            ></button>
          </div>
          <div className='modal-body'>
            <span>Screener Name</span>

            <input type='text' className='form-control' />
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-light'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button type='button' className='btn btn-primary'>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScreener;
