import { SubTitle } from "components/data-display/Typo";
import React from "react";
import HistoryTable from "../data-display/HistoryTable";

interface Indexable {
  [idx: string]: string;
}
interface ITradingHistoryToday {
  body: Indexable[];
  header: string[];
}

const TradingHistoryToday: React.FC<ITradingHistoryToday> = ({
  body,
  header,
}) => {
  return (
    <article className="articleHistory" style={{ marginBottom: "100px" }}>
      <div className="flexRow" style={{ marginTop: "50px" }}>
        <SubTitle title="오늘의 종목" style={{ margin: "20px 0px" }} />
      </div>
      <HistoryTable body={body} header={header} />
    </article>
  );
};

export default TradingHistoryToday;
