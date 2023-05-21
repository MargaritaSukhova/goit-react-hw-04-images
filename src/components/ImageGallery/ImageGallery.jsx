import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  openModal: PropTypes.func.isRequired,
};

export default ImageGallery;
