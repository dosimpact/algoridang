import { IconInfo } from 'assets/icons';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

interface IInspectorHeaderDetail {
  headerTitle: string;
  toolTip?: string;
  linkTo?: string;
}

const InspectorHeaderDetail: React.FC<IInspectorHeaderDetail> = ({
  headerTitle,
  toolTip,
  linkTo,
}) => {
  return (
    <SInspectorHeaderDetail>
      <div>
        <div
          className="col1"
          data-tip="inspectorToolip"
          data-for="inspectorToolip"
        >
          <IconInfo />
        </div>
        <ReactTooltip id="inspectorToolip" place="left">
          {toolTip || ''}
        </ReactTooltip>
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
  align-items: center;
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
    font-weight: 700;
    font-size: 2rem;
  }
  .col3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
