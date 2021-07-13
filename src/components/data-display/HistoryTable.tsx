import React from "react";
import styled from "styled-components";

interface Indexable {
  [idx: string]: string;
}

const HistoryTable: React.FC<{
  header: string[];
  body: Indexable[];
  style?: React.CSSProperties;
  props?: any;
}> = ({ header, body, style, ...props }) => {
  return (
    <HistoryTableS style={{ ...style }} {...props}>
      <table className="historyTable">
        {header.map((el, key) => (
          <th key={key + el} className="header">
            {el}
          </th>
        ))}
        {body.map((el, key) =>
          header.map((hkey) => <td className="body"> {el[hkey]}</td>)
        )}
      </table>
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
