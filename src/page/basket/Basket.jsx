import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from 'react-modal';
import { getDollarSymbol } from '../../utils/helpers';
import { getStateRoot } from './reducer';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    backgroundColor: '#212529',
    minWidth: '500px',
    maxHeight: '100%',
  },
};

const Basket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = useSelector(createSelector(
    getStateRoot,
    (stateRoot) => stateRoot.items,
  ));

  const totalPrice = items.reduce((sum, item) => sum + item.unitPrice, 0).toFixed(2);

  return (
    <>
      <section className="basket-shortcut">
        <div className="basket-shortcut__title">
          <span type="button" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-cart2" />
            <span className="basket-shortcut__title--rasp"> ({items.length})</span>
          </span>
        </div>
      </section>
      <section>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <div>
            <h4>Order summary</h4>
            {!!items.length
              ? (
                <table className="table table-hover table-dark basket-modal__table">
                  <thead className="text-secondary">
                    <tr>
                      <th scope="col" />
                      <th scope="col" className="text-left">Artist</th>
                      <th scope="col" className="text-left">Title</th>
                      <th scope="col">Type</th>
                      <th scope="col" className="text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-secondary">
                    {items.map((item, idx) => (
                      <tr key={item.id}>
                        <th scope="row">{idx + 1}</th>
                        <td className="text-left">{item.artistName}</td>
                        <td className="text-left">{item.title}</td>
                        <td>{item.type?.toLowerCase()}</td>
                        <td className="text-right">{`${item.unitPrice.toFixed(2)} ${getDollarSymbol(item.currency)}`}</td>
                      </tr>
                    ))}
                    <tr>
                      <th scope="col" />
                      <th scope="col" className="text-left">Total</th>
                      <th scope="col" />
                      <th scope="col"></th>
                      <th scope="col" className="text-right">{`${totalPrice} ${getDollarSymbol('USD')}`}</th>
                    </tr>
                  </tbody>
                </table>
                )
              : (
                  <>
                    <span className="basket-modal__icon"><i className="bi bi-cart2" /></span>
                    <div>Basket is empty.</div>
                  </>
                )}
            <button className="button basket-modal__button" onClick={() => setIsModalOpen(false)}>Back to store</button>
            <button className="button button-blue button-disabled basket-modal__button" disabled>Pay</button>
          </div>
        </Modal>
      </section>
    </>
  );
}

export default Basket;
