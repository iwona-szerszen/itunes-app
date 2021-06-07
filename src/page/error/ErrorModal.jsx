import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import CustomModal from '../shared/Modal';
import { getStateRoot } from './reducer';
import { hideModal } from './actions';

const ErrorModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => dispatch(hideModal());

  const isModalOpen = useSelector(createSelector(
    getStateRoot,
    (stateRoot) => stateRoot.isModalVisible,
  ));

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      message="Something went wrong :("
      extraInfo="Unknown error has occurred while fetching results from server."
    />
  );
}

export default ErrorModal;
