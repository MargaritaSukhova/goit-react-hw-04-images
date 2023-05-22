import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, PhotoView } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ tags, largeImageURL, closeModal }) => {
  useEffect(() => {
    const handlePressEsc = e => {
      if (e.code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('keydown', handlePressEsc);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    console.log(e.currentTarget);
    console.log(e.target);
    if (e.currentTarget === e.target) closeModal();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <PhotoView>
        <img src={largeImageURL} alt={tags} />
      </PhotoView>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
