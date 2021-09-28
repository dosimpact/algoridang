import { IconInfo } from 'assets/icons';
import WingBlank from 'components/common/_atoms/WingBlank';
import React from 'react';
import styled from 'styled-components';

interface IInspectorHeaderDetail {
  headerTitle: string;
  linkTo?: string;
}

const InspectorHeaderDetail: React.FC<IInspectorHeaderDetail> = ({
  headerTitle,
  linkTo,
}) => {
  return (
    <SInspectorHeaderDetail>
      <div>
        <div className="col1">
          <IconInfo />
        </div>
      </div>
      <div className="col2">{headerTitle}</div>
      <div className="col3">{/* <IconInfo /> */}</div>
    </SInspectorHeaderDetail>
  );
};

export default InspectorHeaderDetail;

const SInspectorHeaderDetail = styled.header`
  display: grid;
  grid-template-columns: 8rem 1fr 8rem;
  grid-template-rows: 2rem;
  padding: 2.7rem 0rem;
  .col1 {
    svg {
      fill: ${(props) => props.theme.ColorMainGray};
      width: 2rem;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .col2 {
    line-height: 1.8rem;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
  }
  .col3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
