import React from 'react';
import styled from 'styled-components';
import ReportTableCell from './ReportTableCell';

interface Indexable {
  [idx: string]: string;
}

const ReportTable: React.FC<{
  header: string[];
  body: Indexable[];
  style?: React.CSSProperties;
  props?: any;
}> = ({ header, body, style, ...props }) => {
  console.log('header', header, body);
  return (
    <ReportTableS style={{ ...style }} {...props}>
      <div className="container">
        {body.map((el, key) => (
          <ReportTableCell
            key={key}
            title={String(el['name'])}
            subTitle={String(el['val'])}
          ></ReportTableCell>
        ))}
      </div>
    </ReportTableS>
  );
};

export default ReportTable;

const ReportTableS = styled.div`
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    grid-gap: 0.5rem;
    justify-items: center;
    align-items: center;
  }
`;
