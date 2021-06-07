import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { convertMillisToMinAndSec, isPriceValid, getDollarSymbol } from '../../../utils/helpers';
import CustomModal from '../../shared/Modal';
import { getStateRoot } from '../reducer';
import { getStateRoot as getBasketStateRoot } from '../../basket/reducer';
import { addItem } from '../../basket/actions';

const Album = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, songs, ids] = useSelector(createSelector(
    getStateRoot,
    getBasketStateRoot,
    (stateRoot, basketStateRoot) => [stateRoot.album.data, stateRoot.album.songs, basketStateRoot.ids],
  ));

  const {
    collectionId, collectionType, artworkUrl100, collectionName, artistName, artistViewUrl, primaryGenreName,
    releaseDate, collectionPrice, currency,
  } = data;

  const addItemToBasketOrShowError = (item) => {
    if (!!ids.find((id) => id === item.id)) {
      setIsModalOpen(true);
      return;
    }
    return dispatch(addItem(item));
  };

  const addAlbumToBasket = () => {
    const item = {
      id: collectionId,
      artistName,
      title: collectionName,
      type: collectionType,
      unitPrice: collectionPrice,
      currency,
    };
    
    addItemToBasketOrShowError(item);
  }

  const addSongToBasket = (song) => {
    const { trackId: id, artistName, trackName: title, kind: type, trackPrice: unitPrice, currency } = song;
    const item = {
      id,
      artistName,
      title,
      type,
      unitPrice,
      currency,
    };

    addItemToBasketOrShowError(item);
  }

  return (
    <>
      {!!collectionId && (
        <div>
          <section className="row">
            <div className="col-2 album__image">
              <img src={artworkUrl100} alt="" />
            </div>
            <div className="col-10">
              <h3>{collectionName}</h3>
              <div>
                <h4><a href={artistViewUrl} target="blank">{artistName}</a></h4>
              </div>
              <div className="text-grey-light">
                {`${primaryGenreName} - ${new Date(releaseDate).getFullYear()}`}
              </div>
              {isPriceValid(collectionPrice) && (
                <div>
                  {`${collectionPrice.toFixed(2)} ${getDollarSymbol(currency)}`}
                  <span className="icon-basket" type="button" onClick={addAlbumToBasket}><i className="bi bi-cart-plus" /></span>
                </div>
              )}
            </div>
          </section>
          {!!songs.length && (
            <ul className="songs">
              {songs.map((item, idx) => (
                <li key={item.trackId} className={`d-flex songs__li ${idx % 2 !== 0 ? 'songs__li--light' : ''}`}>
                  <div className="text-grey-light songs__number">{item.trackNumber}</div>
                  <div className="songs__title">
                    {`${item.artistName !== artistName ? `${item.artistName} - ` : ''}${item.trackName}`}
                  </div>
                  <div className="text-grey-light songs__duration">
                    {item.trackTimeMillis && typeof item.trackTimeMillis === 'number' && (
                      <span>{convertMillisToMinAndSec(item.trackTimeMillis)}</span>
                    )}
                  </div>
                  <div className="songs__price">
                    {isPriceValid(item.trackPrice) && (
                      <>
                        {`${item.trackPrice.toFixed(2)} ${getDollarSymbol(item.currency)}`}
                        <span className="icon-basket" type="button" onClick={() => addSongToBasket(item)}><i className="bi bi-cart-plus" /></span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <CustomModal
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            message="You cannot add this item to the basket more than once."
            extraInfo="The item has been already added."
          />
        </div>
      )}
    </>
  )
};

export default Album;
