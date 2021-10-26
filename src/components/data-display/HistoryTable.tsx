import FNumber from 'components/common/_atoms/FNumber';
import React from 'react';
import styled from 'styled-components';

/**
 * @param header 테이블의 상단
 * @param body  테이블의 바디 데이터 object[] 형식
 * @param keyMap body에서 가져올 데이터
 * @param skip
 * @param take
 */
const HistoryTable: React.FC<{
  header: string[];
  body: Record<string, string>[];
  keyMap: string[];
  skip?: number;
  take?: number;
  style?: React.CSSProperties;
  props?: any;
}> = ({ header, keyMap, body, style, skip, take, ...props }) => {
  skip = skip || 0;
  take = take || 30;

  return (
    <HistoryTableS style={{ ...style }} {...props}>
      <div className="historyTableHeader">
        {header &&
          Array.isArray(header) &&
          header.length >= 1 &&
          header.map((el, key) => (
            <div key={key + el} className="header flexCenter">
              {el}
            </div>
          ))}
      </div>
      <div className="historyTableBody">
        {body.slice(skip, skip + take).map((el, key) =>
          keyMap.map((hkey) => {
            if (hkey === 'profit_loss_rate') {
              return (
                <div className="body flexCenter" key={key + hkey + el[hkey]}>
                  {el[hkey] ? (
                    <>
                      <FNumber val={Number(el[hkey])} /> <span>%</span>
                    </>
                  ) : (
                    <span className="buy">매수</span>
                  )}
                </div>
              );
            }
            return (
              <div className="body flexCenter" key={key + hkey + el[hkey]}>
                {el[hkey]}
              </div>
            );
          }),
        )}
      </div>
    </HistoryTableS>
  );
};

export default HistoryTable;

const HistoryTableS = styled.div`
  .historyTableHeader {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 4.5rem;
    width: 100%;
    .header {
      text-align: center;
      background: rgba(196, 196, 196, 0.09);
      height: 4.5rem;
      white-space: pre-wrap;
      font-size: 1.2rem;
    }
  }
  .historyTableBody {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .body {
      text-align: center;
      border-bottom: 1px solid #e4e4e4;
      height: 5rem;
      font-size: 1.2rem;
    }
    .buy {
      color: ${(props) => props.theme.ColorMainGray};
    }
  }
`;
