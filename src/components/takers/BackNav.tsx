import { WhiteSpace } from "antd-mobile";
import { Title } from "components/data-display/Typo";
import useBackButton from "hooks/useBackButton";
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
