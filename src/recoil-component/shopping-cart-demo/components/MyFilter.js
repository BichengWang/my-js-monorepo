// @flow
import { tableFilter } from "../store/atoms";
import { useRecoilState } from "recoil";
import React from "react";

const TableFilter = () => {
  const [tableFilterValue, setTableFilterValue] = useRecoilState(tableFilter);

  const filter = (event) => {
    const { value } = event.target;
    setTableFilterValue(value);
  };

  const clearFilter = () => setTableFilterValue("");

  return (
    <div>
      <div>Filter:</div>
      <input
        onChange={(e) => filter(e)}
        placeholder="Filter by Product Name"
        type="text"
        value={tableFilterValue}
      />
      <button onClick={() => clearFilter()} >Reset Filter</button>
    </div>
  );
};

export default TableFilter;
