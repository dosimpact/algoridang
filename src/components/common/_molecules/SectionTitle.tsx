import React from 'react';
import { Title } from 'components/common/_atoms/Typos';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SectionTitle: React.FC<{ title: string; linkTo?: string }> = ({
  title,
  linkTo,
}) => {
  return (
    <SSectionTitle>
      <Title title={title} />
      {linkTo && (
        <Link to={linkTo}>
          <div className="detailLink">더 보기</div>
        </Link>
      )}
    </SSectionTitle>
  );
};

export default SectionTitle;

const SSectionTitle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .detailLink {
    font-size: 1.2rem;
    color: ${(props) => props.theme.ColorMainGray};
  }
`;
