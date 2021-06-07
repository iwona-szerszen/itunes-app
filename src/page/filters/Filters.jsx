import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import CONSTANTS from '../../utils/CONSTANTS';
import { getStateRoot } from './reducer';
import { setEntity, setSearchText } from './actions';
import { fetchArtist, fetchAlbum } from '../selectedItem/actions';

const options = [
  { id: CONSTANTS.ENTITY.ARTIST, label: 'Artists' },
  { id: CONSTANTS.ENTITY.ALBUM, label: 'Albums' },
  { id: CONSTANTS.ENTITY.SONG, label: 'Songs' },
];

const FiltersBar = () => {
  const dispatch = useDispatch();

  const [entity, searchText, results, isWaiting] = useSelector(createSelector(
    getStateRoot,
    (stateRoot) => [stateRoot.entity, stateRoot.searchText, stateRoot.results, stateRoot.isWaiting],
  ));

  const handleChangeEntity = (evt) => dispatch(setEntity(evt.target.value));

  const handleChangeSearchText = (evt) => dispatch(setSearchText(evt.target.value));

  const onKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      handleChangeSearchText(evt);
    }
  };

  const resetSearchText = () => dispatch(setSearchText(''));

  const selectArtist = (artistId) => dispatch(fetchArtist(artistId));

  const selectAlbumOrSong = (collectionId) => dispatch(fetchAlbum(collectionId));

  return (
    <section className="filters">
      <div className="d-flex justify-content-between">
        {options.map((option) => (
          <div key={option.id} className="">
            <input
              type="radio"
              value={option.id}
              id={option.id}
              checked={option.id === entity}
              onChange={handleChangeEntity}
            />
            <button className="button"><label htmlFor={option.id}>{option.label}</label></button>
          </div>
        ))}
      </div>
      <div className="input-group filters__input-group">
        <span className="input-group-text"><i className="bi bi-search" /></span>
        <input
          type="text"
          placeholder="search ..."
          className="form-control"
          value={searchText}
          onChange={handleChangeSearchText}
          onKeyDown={onKeyDown}
        />
        {!!searchText && (
          <span className="input-group-text" type="button" onClick={() => resetSearchText()}>
            <i className="bi bi-x-lg" />
          </span>
        )}
      </div>
      {isWaiting && (
        <div className="text-center filters__loader">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!!results.length && !isWaiting && (
        <ul className="filters__results">
          {entity === CONSTANTS.ENTITY.ARTIST && results.map((item) => (
            <li key={item.artistId} className="filters__result text-md text-ellipsis" onClick={() => selectArtist(item.artistId)}>
              <span>{item.artistName}</span>
            </li>
          ))}
          {entity === CONSTANTS.ENTITY.ALBUM && results.map((item) => (
            <li key={item.collectionId} className="filters__result text-md text-ellipsis" onClick={() => selectAlbumOrSong(item.collectionId)}>
              <span>{`${item.artistName} - ${item.collectionName}`}</span>
            </li>
          ))}
          {entity === CONSTANTS.ENTITY.SONG && results.map((item) => (
            <li key={item.trackId} className="filters__result text-md text-ellipsis" onClick={() => selectAlbumOrSong(item.collectionId)}>
              <span>{`${item.artistName} - ${item.trackName}`}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FiltersBar;
