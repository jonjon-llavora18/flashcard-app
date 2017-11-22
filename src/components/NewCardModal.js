import {connect} from 'react-redux';
import CardModal from './CardModal';
import {addCard} from '../actions';

const mapState = (props, {params: {deckId}}) => ({
  card: {deckId}
});

const mapDispatch = dispatch => ({
  onSave: card => dispatch(addCard(card))
});

export default connect(mapState, mapDispatch)(CardModal);
