import ReportTable from 'components/report/_molecules/ReportTable';
import { SubTitle } from 'components/common/_atoms/Typos';
import React from 'react';
import styled from 'styled-components';
import WhiteSpace from 'components/common/_atoms/WhiteSpace';

interface Indexable {
  [idx: string]: string;
}

interface IDetailSummary {
  header: string[];
  body: Indexable[];
  props?: any;
}

const DetailSummary: React.FC<IDetailSummary> = ({
  header,
  body,
  ...props
}) => {
  return (
    <SDetailSummary
      {...props}
      className="articleDetailSummary"
      style={{ marginBottom: '100px' }}
    >
      <div className="flexRow" style={{ marginTop: '50px' }}>
        <SubTitle title="상세 투자 정보" style={{ margin: '20px 0px' }} />
      </div>
      <WhiteSpace />
      <ReportTable body={body} header={header} />
    </SDetailSummary>
  );
};

export default DetailSummary;

const SDetailSummary = styled.section``;
