import { Box } from 'components/common/_atoms/Box';
import { SubTitle } from 'components/common/_atoms/Typos';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';
import React from 'react';
import styled from 'styled-components';
import HistoryTable from '../../data-display/HistoryTable';

interface ITradingHistory {
  title: string;
  body: Record<string, string>[];
  keyMap: string[];
  header: string[];
}

const TradingHistory: React.FC<ITradingHistory> = ({
  title,
  body,
  keyMap,
  header,
}) => {
  // 현재 페이지
  const [page, setPage] = React.useState(0);
  // 현재 보이는 요소 수
  const [take, setTake] = React.useState(100);

  // 총 요소 수 , 총 페이지 수
  const paginationInfo = React.useMemo(() => {
    const totalLen = body.length;
    const pageLen = Math.ceil(body.length / take);
    return { totalLen, pageLen };
  }, [body, take]);

  //
  const handleClickPage = (idx: number) => {
    setPage(idx);
  };

  const handleToogleTake = () => {
    if (take === 30) setTake(50);
    else if (take === 50) setTake(100);
    else if (take === 100) setTake(30);
    else setTake(30);

    setPage(0);
  };

  return (
    <STradingHistory
      className="articleHistory"
      style={{ marginBottom: '100px' }}
    >
      <div className="flexRowSBt">
        <SubTitle title={title} style={{ margin: '20px 0px' }} />
        <Box
          type="normal"
          style={{ width: '10rem', fontSize: '1.2rem' }}
          onClick={handleToogleTake}
        >
          {take} 개씩보기
        </Box>
      </div>
      <WhiteSpace />
      <article className="pagination">
        {Array(paginationInfo.pageLen)
          .fill(0)
          .map((_, idx) => {
            if (idx === page) {
              return <Box onClick={() => handleClickPage(idx)}>{idx + 1}</Box>;
            }
            return (
              <Box type="gray" onClick={() => handleClickPage(idx)}>
                {idx + 1}
              </Box>
            );
          })}
      </article>
      <WhiteSpace />
      <HistoryTable
        body={body}
        keyMap={keyMap}
        header={header}
        skip={take * page}
        take={take}
      />
    </STradingHistory>
  );
};

export default TradingHistory;

const STradingHistory = styled.article`
  .pagination {
    display: grid;
    grid-template-columns: repeat(auto-fill, 30px); //repeat(10, 1fr);
    grid-gap: 1rem;
  }
`;
