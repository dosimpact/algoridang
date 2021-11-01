import React from 'react';
import { IconArrowLeft } from 'assets/icons';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface INavHeaderDetail {
  headerTitle: string;
  linkTo?: string;
  pushBack?: boolean;
  onClickBack?: () => void;
}

const NavHeaderDetail: React.FC<INavHeaderDetail> = ({
  headerTitle,
  linkTo,
  pushBack,
  onClickBack,
}) => {
  const history = useHistory();
  if (onClickBack) {
    return (
      <SNavHeaderDetail>
        <div className="col1" onClick={onClickBack}>
          <IconArrowLeft />
        </div>
        <div className="col2">{headerTitle}</div>
        <div className="col3">{/* <IconArrowLeft /> */}</div>
      </SNavHeaderDetail>
    );
  }
  if (pushBack) {
    return (
      <SNavHeaderDetail>
        <div className="col1" onClick={history.goBack}>
          <IconArrowLeft />
        </div>
        <div className="col2">{headerTitle}</div>
        <div className="col3">{/* <IconArrowLeft /> */}</div>
      </SNavHeaderDetail>
    );
  }
  if (linkTo) {
    return (
      <SNavHeaderDetail>
        <Link to={linkTo || process.env.PUBLIC_URL + '/takers/strategy-search'}>
          {linkTo && (
            <div className="col1">
              <IconArrowLeft />
            </div>
          )}
        </Link>
        <div className="col2">{headerTitle}</div>
        <div className="col3">{/* <IconArrowLeft /> */}</div>
      </SNavHeaderDetail>
    );
  }
  return (
    <SNavHeaderDetail>
      <div className="col1"></div>
      <div className="col2">{headerTitle}</div>
      <div className="col3">{/* <IconArrowLeft /> */}</div>
    </SNavHeaderDetail>
  );
};

export default NavHeaderDetail;

const SNavHeaderDetail = styled.header`
  display: grid;
  grid-template-columns: 8rem 1fr 8rem;
  grid-template-rows: 2rem;
  padding: 2.7rem 0rem;

  .col1 {
    svg {
      fill: ${(props) => props.theme.ColorMainGray};
      width: 2rem;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .col2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: bold;
    font-size: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
  }
  .col3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
