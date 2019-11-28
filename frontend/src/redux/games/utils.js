import * as actions from 'redux/games/actions';
import GamesService from 'services/Games';

export const gamesFetch = (page = 1, limit = 10) => async dispatch => {
  try {
    const offset = (page - 1) * limit;
    dispatch(actions.gamesFetchStart());
    const games = await GamesService.fetch(offset, limit);
    dispatch(actions.gamesFetchSuccess(games));
  } catch (error) {
    dispatch(actions.gamesFetchFailure(error));
  }
};
