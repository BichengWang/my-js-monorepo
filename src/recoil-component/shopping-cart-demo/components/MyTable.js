// @flow
import {
  cart,
  currentTableID,
  recordAtomFamily,
  tableAtomFamily,
} from "../store/atoms";
import { filterCurrentTableRecord } from "../store/selectors";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import { Switch } from "react-router-dom";
import { tableInfoQueryFamily, useAddItem, useAddRecord } from "../store";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { useSetRecords, useSetTable } from "../store/hooks";
import MyFilter from "./MyFilter";
import MyRecord from "./MyRecord";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [tableInputVal, setTableInputVal] = useState("node1");
  const setCurrentTableIDVal = useSetRecoilState(currentTableID);
  const filteredCurrentTableRecords = useRecoilValue(filterCurrentTableRecord);

  console.log(
    "currentTableInfoQueryVal, ",
    JSON.stringify(filteredCurrentTableRecords)
  );

  return (
    <div>
      <MyFilter />
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
        {filteredCurrentTableRecords &&
          filteredCurrentTableRecords.map(({ id, record }, idx) => {
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
