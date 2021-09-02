import React from "react";
import styled from "styled-components";

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
  console.log("skip take", skip, take);

  return (
    <HistoryTableS style={{ ...style }} {...props}>
      <div className="historyTable">
        {header &&
          Array.isArray(header) &&
          header.length >= 1 &&
          header.map((el, key) => (
            <div key={key + el} className="header">
              {el}
            </div>
          ))}

        {body.slice(skip, skip + take).map((el, key) =>
          keyMap.map((hkey) => (
            <div className="body" key={key + hkey + el[hkey]}>
              {el[hkey]}
            </div>
          ))
        )}
      </div>
    </HistoryTableS>
  );
};

export default HistoryTable;

const HistoryTableS = styled.div`
  .historyTable {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows: repeat(auto-fit, 1fr); */
    grid-auto-rows: 30px;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    align-items: center;
    justify-content: center;
    .header {
      text-align: center;
    }
    .body {
      text-align: center;
    }
  }
`;
