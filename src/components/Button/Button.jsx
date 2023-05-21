import PropTypes from 'prop-types';
import { BtnContainer, Btn } from './Button.styled';

const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <BtnContainer>
      <Btn type="button" onClick={handleLoadMore}>
        Load more
      </Btn>
    </BtnContainer>
  );
};

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
