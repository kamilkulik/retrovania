import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { errorHandlerLocal } from 'components/errorHandlerLocal';
import { GamesList } from './GamesList';
import { withSpinnerLocal } from 'components/withSpinnerLocal';
import { gamesFetch } from 'redux/games/utils';
import { useHistory, useLocation } from 'react-router-dom';

const GamesListContainer = ({ games, gamesFetch, total }) => {
  const location = useLocation();

  useEffect(() => {
    let params = new URLSearchParams(location.search);
    console.log(params.get('page'));
    gamesFetch(params.get('page'));
  }, [location]);

  return <GamesList games={games} gamesFetch={gamesFetch} total={total} />;
};

const mapStateToProps = state => ({
  error: state.games.error,
  games: state.games.gamesInStore,
  total: state.games.total,
  isLoading: state.games.loading
});

const mapDispatchToProps = dispatch => ({
  gamesFetch: page => dispatch(gamesFetch(page))
});

const EnhancedGamesListContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  //withSpinnerLocal, // Commented out because it is causing infinite re-rendering of games list. Spinner should not be a HOC but a component inside a page
  errorHandlerLocal
)(GamesListContainer);

export { EnhancedGamesListContainer as GamesListContainer };
