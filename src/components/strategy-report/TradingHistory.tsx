import { SubTitle } from "components/data-display/Typo";
import React from "react";
import HistoryTable from "../data-display/HistoryTable";

interface ITradingHistory {
  title: string;
  body: Record<string, string>[];
  keyMap: string[];
  header: string[];
}

const TradingHistory: React.FC<ITradingHistory> = ({
  title,
  body,
  keyMap,
  header,
}) => {
  return (
    <article className="articleHistory" style={{ marginBottom: "100px" }}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title={title} style={{ margin: "20px 0px" }} />
      </div>
      <HistoryTable body={body} keyMap={keyMap} header={header} />
    </article>
  );
};

export default TradingHistory;
