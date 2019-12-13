import React from 'react';

import { Button } from 'components/Button';
import { Link } from 'components/Link';

import * as S from './Game.styles';

const Game = ({ cart, cartAddItem, game, isUserLoggedIn }) => {
  const renderActions = () => {
    if (isUserLoggedIn) {
      if (cart.find(({ _id }) => _id === game._id)) {
        return <p>This game is already in your cart.</p>;
      }
      return <Button onClick={() => cartAddItem(game)}>Rent it</Button>;
    }
    return (
      <p>
        <Link to={{ pathname: '/signin', state: { goBack: true } }}>
          Sign in
        </Link>{' '}
        or{' '}
        <Link to={{ pathname: '/signup', state: { goBack: true } }}>
          Sign up
        </Link>{' '}
        to rent this game.
      </p>
    );
  };

  return (
    game && (
      <S.GameWrapper>
        <S.GameTitle>{game.name}</S.GameTitle>
        <S.GameSummary>{game.summary}</S.GameSummary>
        <S.GameReleaseDate>
          {'Release date: '}
          <S.GameHighlight>
            {new Date(game.firstReleaseDate * 1000).toLocaleDateString()}
          </S.GameHighlight>
        </S.GameReleaseDate>
        <S.GameGenres>
          {'Genres: '}
          <S.GameHighlight>{game.genres.join(', ')}</S.GameHighlight>
        </S.GameGenres>
        <S.GameActions>{renderActions()}</S.GameActions>
      </S.GameWrapper>
    )
  );
};

export { Game };
