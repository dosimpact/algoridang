import React from "react";
import styled from "styled-components";
import { WingBlank, WhiteSpace } from "antd-mobile";

const MakerMain = () => {
  return (
    <SMakerMain>
      <section className="navigation">
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <SHeader>
          <WingBlank className="hwrapper">
            {/* <div className="icon">🥞</div> */}
            <div>
              <div className="headerName">알고리당</div>
              <div className="headerSubName">Makers</div>
            </div>
          </WingBlank>
        </SHeader>
        <WhiteSpace size="xl" />
        <SNav>
          <div className="navItem flexCenter">퀀트 전략 생성</div>
          <div className="navItem flexCenter">나의 전략</div>
          <div className="navItem flexCenter">공개 전략</div>
        </SNav>
      </section>
      <section className="content">
        <div className="000">000</div>
      </section>
    </SMakerMain>
  );
};
const SMakerMain = styled.section`
  display: grid;
  grid-template-columns: 25rem 1fr;
  .navigation {
    /* background-color: red; */
  }
`;
const SHeader = styled.header`
  .hwrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .icon {
    }
    .headerName {
      font-size: 7.5rem;
      font-weight: 700;
    }
    .headerSubName {
      font-size: 4.5rem;
    }
  }
`;
const SNav = styled.nav`
  .navItem {
    height: 7rem;
    font-size: ${(props) => props.theme.FontSizeXXlg};
    font-weight: 700;
    background-color: ${(props) => props.theme.ColorWhite};
    cursor: pointer;
  }
`;

export default MakerMain;
export { MakerMain as MakersHome };
