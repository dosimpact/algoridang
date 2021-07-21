import { SubTitle } from "components/data-display/Typo";
import React from "react";
import HistoryTable from "./HistoryTable";

interface Indexable {
  [idx: string]: string;
}
interface ITradingHistory {
  body: Indexable[];
  header: string[];
}

const TradingHistory: React.FC<ITradingHistory> = ({ body, header }) => {
  return (
    <article className="articleHistory" style={{ marginBottom: "100px" }}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="히스토리" style={{ margin: "20px 0px" }} />
      </div>
      <HistoryTable body={body} header={header} />
    </article>
  );
};

export default TradingHistory;
