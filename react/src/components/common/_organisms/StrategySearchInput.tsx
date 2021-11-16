import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import WhiteSpace from '../_atoms/WhiteSpace';

const StrategySearchInput = () => {
  const [term, setTerm] = useState('');
  const history = useHistory();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (term) {
      history.push(`/takers/strategy-search/term/${term}`);
    }
  };
  return (
    <SStrategySearchInput>
      <WhiteSpace />
      <form onSubmit={handleSearchSubmit}>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="전략 이름 또는 종목 검색"
          type="text"
        />
      </form>
    </SStrategySearchInput>
  );
};

export default StrategySearchInput;

const SStrategySearchInput = styled.article`
  input {
    ${(props) => props.theme.shadowLine1};
  }
`;
