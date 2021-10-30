import styled from 'styled-components';

const BottomGradient = () => {
  return (
    <SBottomGradient>
      <div className="yellowGradient"></div>
    </SBottomGradient>
  );
};

export default BottomGradient;

const SBottomGradient = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: -1;
  .yellowGradient {
    width: 100%;
    height: 40vh;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -100;
    background: linear-gradient(0deg, #fff2d2 0%, rgba(255, 255, 255, 0) 100%);
  }
`;
