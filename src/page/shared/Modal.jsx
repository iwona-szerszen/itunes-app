import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#dfdfdf',
    backgroundColor: '#282c34',
  },
};

const CustomModal = ({ isModalOpen, closeModal, message, extraInfo }) => (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <div>
      <span className="modal__icon"><i className="bi bi-exclamation-circle" /></span>
      <h6 className="modal__title">{message}</h6>
      <div className="modal__extra-info">{extraInfo}</div>
      <button className="button" onClick={closeModal}>OK </button>
    </div>
  </Modal>
);

export default CustomModal;
