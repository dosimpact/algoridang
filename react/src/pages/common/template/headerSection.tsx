import { Button } from 'components/common/_atoms/Buttons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { up } from 'styled-breakpoints';
import styled from 'styled-components';

const HeaderSection = () => {
  const history = useHistory();

  return (
    <SHeaderSection>
      <div
        className="logo"
        onClick={() => {
          history.push('/takers');
        }}
      >
        <img
          className="logoImage"
          alt="logoImage"
          src="data:image/png;base64,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"
        ></img>
        <div className="logoText">알고리당</div>
      </div>
      <div className="navInfo">
        <Link className="takersPCView" to="takers/ticker-search">
          <Button className="btns" type="normal">
            전략 탐색
          </Button>
        </Link>
        <Link className="makersPCView" to="makers/ticker-search">
          <Button className="btns" type="blue">
            전략 생성
          </Button>
        </Link>
      </div>
    </SHeaderSection>
  );
};

const SHeaderSection = styled.header`
  height: 7.4rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-content: center;
  /* background-color: ${(props) => props.theme.ColorMainDarkGray}; */
  ${up('md')} {
    padding: 0px 2rem;
  }
  z-index: 1000;
  svg {
    fill: ${(props) => props.theme.ColorMainWhite};
  }
  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    .logoImage {
      width: 4rem;
      ${up('md')} {
        width: 6rem;
      }
    }
    .logoText {
      font-weight: 700;
      font-size: 2rem;
      ${up('md')} {
        font-weight: 700;
        font-size: 2.5rem;
      }
    }
  }
  .navInfo {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    .btns {
      margin-left: 1rem;
      font-size: 1.6rem;
      ${up('md')} {
        width: 12rem;
        height: 4rem;
        font-weight: 700;
        font-size: 2rem;
      }
    }
  }
  svg {
    width: 2.2rem;
  }
`;

export default HeaderSection;
