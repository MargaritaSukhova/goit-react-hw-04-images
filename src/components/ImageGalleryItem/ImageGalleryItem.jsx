import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <GalleryItem onClick={() => setShowModal(true)}>
      <GalleryImg src={webformatURL} alt={tags} />
      {showModal && (
        <Modal
          tags={tags}
          largeImageURL={largeImageURL}
          closeModal={() => setShowModal(false)}
        />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
