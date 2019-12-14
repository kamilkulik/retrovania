import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import * as S from './Pagination.styles';
import { Link } from 'components/Link';

export const Pagination = props => {
  const [activePage, setActivePage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    if (page) {
      setActivePage(+page);
    }
  }, [location]);

  const handleArrowLinkClick = (event, page) => {
    if (activePage === page) {
      event.preventDefault();
      return;
    }
  };

  const createPages = () => {
    return Array.from(Array(props.pageCount).keys()).map((el, index) => (
      <S.LI key={index} active={activePage == index + 1}>
        <Link to={`/games?page=${index + 1}`}>{index + 1}</Link>
      </S.LI>
    ));
  };

  return (
    <S.Ul>
      <S.LI disabled={activePage === 1}>
        <Link
          disabled={activePage === 1}
          onClick={e => handleArrowLinkClick(e, 1)}
          to={`/games?page=${activePage - 1}`}
        >
          Previous
        </Link>
      </S.LI>
      {createPages()}
      <S.LI disabled={activePage === props.pageCount}>
        <Link
          onClick={e => handleArrowLinkClick(e, props.pageCount)}
          to={`/games?page=${activePage + 1}`}
        >
          Next
        </Link>
      </S.LI>
    </S.Ul>
  );
};