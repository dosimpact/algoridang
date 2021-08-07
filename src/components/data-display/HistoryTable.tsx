import React from "react";
import styled from "styled-components";

const HistoryTable: React.FC<{
  header: string[];
  body: Record<string, string>[];
  keyMap: string[];
  style?: React.CSSProperties;
  props?: any;
}> = ({ header, keyMap, body, style, ...props }) => {
  console.log("header", header);
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

        {body.map((el, key) =>
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
