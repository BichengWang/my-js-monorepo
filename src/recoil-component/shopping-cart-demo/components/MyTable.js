// @flow
import {
  cart,
  currentTableID,
  recordAtomFamily,
  tableAtomFamily,
} from "../store/atoms";
import { currentTableInfoQuery, useAddItem, useAddRecord } from "../store";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import { Switch } from "react-router-dom";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { useSetRecords, useSetTable } from "../store/hooks";
import MyRecord from "./MyRecord";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [tableInputVal, setTableInputVal] = useState("node1");
  const [currentTableIDVal, setCurrentTableIDVal] = useRecoilState(
    currentTableID
  );
  const currentTableInfoQueryVal = useRecoilValue(
    currentTableInfoQuery(currentTableIDVal)
  );

  console.log(
    "currentTableInfoQueryVal, ",
    JSON.stringify(currentTableInfoQueryVal)
  );

  return (
    <div>
      <div>
        Current Table ID:
        <input
          key={"currentTableIDInput"}
          onChange={({ target: { value } }) => {
            setTableInputVal(value);
          }}
          type="text"
        />
        <button
          onClick={() => {
            setCurrentTableIDVal(tableInputVal);
          }}
        >
          Switch Table
        </button>
      </div>
      <div>
        {currentTableInfoQueryVal.records &&
          currentTableInfoQueryVal.records.map(({ id, record }, idx) => {
            console.log("record, ", JSON.stringify(record));
            return (
              <MyRecord index={idx} key={idx} recordID={id} val={record} />
            );
          })}
      </div>
    </div>
  );
};

const MyTable = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Table />
    </React.Suspense>
  );
};

export default MyTable;
