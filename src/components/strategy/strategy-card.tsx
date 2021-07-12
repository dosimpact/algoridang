import React from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";

interface IStrategyCard {
  thumnail: string;
  title: string;
  tag: string[];
  CAGR: number;
}

const StrategyCard: React.FC<IStrategyCard> = ({
  CAGR = null,
  tag = [],
  thumnail = "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  title = "Error",
}) => {
  return (
    <Card>
      <article className="left">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt="thumnail"
        ></img>
      </article>
      <article className="right">
        <div className="title"></div>
        <div className="tag"></div>
        <div className="CAGR"></div>
      </article>
    </Card>
  );
};

const Card = styled.section``;

export default StrategyCard;
