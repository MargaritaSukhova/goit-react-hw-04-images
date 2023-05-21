import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../Button/Button';
import Modal from '../Modal/Modal';
import SearchImages from 'services/pixabay-api';
import { AppContainer } from '../App/App.styled';
import { Error } from '../Error/Error.styled';

class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
    isEmpty: false,
    showBtn: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.setState({ isLoading: true });
      SearchImages(value, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  openModal = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, tags });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleSubmit = value => {
    this.setState({
      value,
      page: 1,
      images: [],
      isEmpty: false,
      showBtn: false,
      error: null,
      showModal: false,
      largeImageURL: '',
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      error,
      isEmpty,
      showBtn,
      showModal,
      largeImageURL,
      tags,
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {error && <Error>{error.message}</Error>}
        {isEmpty && <Error>No images found</Error>}
        <ImageGallery
          images={images}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
        {showBtn && <LoadMoreBtn handleLoadMore={this.handleLoadMore} />}
        {showModal && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            closeModal={this.closeModal}
          />
        )}
        <ToastContainer autoClose={2500} />
      </AppContainer>
    );
  }
}

export default App;
