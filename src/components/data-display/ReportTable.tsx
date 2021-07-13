import React from "react";
import styled from "styled-components";

interface Indexable {
  [idx: string]: string;
}

const ReportTable: React.FC<{
  header: string[];
  body: Indexable[];
  style?: React.CSSProperties;
  props?: any;
}> = ({ header, body, style, ...props }) => {
  return (
    <ReportTableS style={{ ...style }} {...props}>
      <div className="ReportTable">
        {header.map((el, key) => (
          <div key={key + el} className="header">
            {el}
          </div>
        ))}
        {body.map((el, key) =>
          header.map((hkey) => (
            <div className="body" key={key + hkey + el[hkey]}>
              {el[hkey]}
            </div>
          ))
        )}
      </div>
    </ReportTableS>
  );
};

export default ReportTable;

const ReportTableS = styled.div`
  .ReportTable {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
