// @flow
import { cart, currentTableID, recordAtomFamily } from "../store/atoms";
import { currentTableInfoQuery, useAddItem, useAddRecord } from "../store";
import { myDBQuery } from "../../../utils/my-db-mock-query-component";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import React, { useEffect } from "react";

const MyRecord = ({ index: index, recordID: recordID, val: val }) => {
  const [recordVal, setRecordVal] = useRecoilState(recordAtomFamily(recordID));
  useEffect(() => {
    setRecordVal(val);
  }, [val]);
  console.log("recordID: ", recordID);
  console.log("val: ", val);
  console.log("recordVal: ", recordVal);

  return (
    <div>
      <div>{recordVal}</div>
      <div>
        New Record Update:{" "}
        <input
          onChange={({ target: { value } }) => {
            setRecordVal(value);
          }}
          type="text"
        />
      </div>
    </div>
  );
};

export default MyRecord;
