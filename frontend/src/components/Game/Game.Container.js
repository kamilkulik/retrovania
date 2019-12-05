import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { errorHandlerLocal } from 'components/errorHandlerLocal';
import { withSpinnerLocal } from 'components/withSpinnerLocal';
import { Game } from './Game';

import { gameFetch } from 'redux/game/utils';

const GameContainer = ({ id, isUserLoggedIn, game, gameFetch }) => {
  useEffect(() => {
    if (!game || game._id !== id) {
      gameFetch(id);
    }
  }, []);

  return <Game game={game} isUserLoggedIn={isUserLoggedIn} />;
};

const mapStateToProps = state => ({
  error: state.game.error,
  game: state.game.current,
  isLoading: state.game.loading,
  isUserLoggedIn: !!state.user.current
});

const mapDispatchToProps = dispatch => ({
  gameFetch: id => dispatch(gameFetch(id))
});

const EnhancedGameContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withSpinnerLocal,
  errorHandlerLocal
)(GameContainer);

export { EnhancedGameContainer as GameContainer };