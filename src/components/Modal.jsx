// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">{message}</h2>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black rounded-md p-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white rounded-md p-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
