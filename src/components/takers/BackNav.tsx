import { WhiteSpace } from "antd-mobile";
import { Title } from "components/_atoms/Typo";
import useBackButton from "components/lagacy/useBackButton";
import React from "react";

interface IBackNav {
  title: string;
}
const BackNav: React.FC<IBackNav> = ({ title }) => {
  const Back = useBackButton();
  return (
    <>
      <div className="flexRow">
        {Back()}
        <Title title={title} />
      </div>
      <WhiteSpace size="xl" />
    </>
  );
};
export default BackNav;
