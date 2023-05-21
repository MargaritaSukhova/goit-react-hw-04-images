import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, PhotoView } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlePressEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePressEsc);
  }

  handlePressEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.closeModal();
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <PhotoView>
          <img src={largeImageURL} alt={tags} />
        </PhotoView>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
