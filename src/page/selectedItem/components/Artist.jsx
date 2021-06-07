import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { isPriceValid, getDollarSymbol } from '../../../utils/helpers';
import CustomModal from '../../shared/Modal';
import { getStateRoot } from '../reducer';
import { getStateRoot as getBasketStateRoot } from '../../basket/reducer';
import { addItem } from '../../basket/actions';

const Artist = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, albums, ids] = useSelector(createSelector(
    getStateRoot,
    getBasketStateRoot,
    (stateRoot, basketStateRoot) => [stateRoot.artist.data, stateRoot.artist.albums, basketStateRoot.ids],
  ));

  const { artistId, artistName, artistLinkUrl, primaryGenreName } = data;

  const addAlbumToBasket = (album) => {
    const { collectionId: id, artistName, collectionName: title, collectionType: type, collectionPrice: unitPrice, currency } = album;
    const item = {
      id,
      artistName,
      title,
      type,
      unitPrice,
      currency,
    };
  
    if (!!ids.find((el) => el === id)) {
      setIsModalOpen(true);
      return;
    }
    return dispatch(addItem(item));
  }

  return (
    <>
      {!!artistId && (
        <div>
          <section>
            <h2>{artistName}</h2>
            <div className="line-height-normal">{`Genre: ${primaryGenreName}`}</div>
            <p>More info on <a href={artistLinkUrl} target="blank">Apple Music</a></p>
          </section>
          <hr />
          {!!albums.length && (
            <section>
              <h5>Albums</h5>
              <div className="row">
                {albums.map((item) => (
                  <div key={item.collectionId} className="col-2 albums__album">
                    <div>
                      <img src={item.artworkUrl100} alt="" />
                    </div>
                    <div className="text-ellipsis albums__title line-height-normal">{item.collectionName}</div>
                    <div className="albums__date text-md text-grey-light line-height-normal">{new Date(item.releaseDate).getFullYear()}</div>
                    {isPriceValid(item.collectionPrice) && (
                      <div className="line-height-normal">
                        {`${item.collectionPrice.toFixed(2)} ${getDollarSymbol(item.currency)}`}
                        <span type="button" className="icon-basket" onClick={() => addAlbumToBasket(item)}><i className="bi bi-cart-plus" /></span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        message="You cannot add this item to the basket more than once."
        extraInfo="The item has been already added."
      />
    </>
  );
};

export default Artist;
