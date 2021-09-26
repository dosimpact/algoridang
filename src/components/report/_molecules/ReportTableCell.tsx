import React from 'react';
import styled from 'styled-components';

const ReportTableCell: React.FC<{
  title: string;
  subTitle: string;
  [props: string]: any;
}> = ({ subTitle, title, ...props }) => {
  return (
    <SReportTableCell {...props}>
      <div className="title">{title}</div>
      <div className="subTitle">{subTitle}</div>
    </SReportTableCell>
  );
};

export default ReportTableCell;

const SReportTableCell = styled.div`
  padding-top: 1rem;
  width: 100%;
  height: 8rem;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.ColorMainLightGray};
  }
  /* display: flex; */
  /* flex-flow: column nowrap; */
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.4rem;
    text-align: center;
    white-space: pre-wrap;
  }
  .subTitle {
    margin-top: 1.6rem;
    font-style: normal;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.9rem;
    text-align: center;
    white-space: pre-wrap;
  }
`;
