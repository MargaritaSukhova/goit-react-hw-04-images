import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../Button/Button';
import SearchImages from 'services/pixabay-api';
import { AppContainer } from '../App/App.styled';
import { Error } from '../Error/Error.styled';

const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, SetError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (value === '') return;

    setIsLoading(true);
    SearchImages(value, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      })
      .catch(error => {
        SetError(error);
      })
      .finally(() => setIsLoading(false));
  }, [value, page]);

  const handleSubmit = query => {
    if (query === value) {
      return notify();
    }
    setValue(query);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setShowBtn(false);
    SetError(null);
  };

  const notify = () => {
    toast.error('Please enter new query request', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: 'colored',
    });
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <Error>{error.message}</Error>}
      {isEmpty && <Error>No images found</Error>}
      <ImageGallery images={images} />
      {showBtn && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      <ToastContainer autoClose={2500} />
    </AppContainer>
  );
};

export default App;
