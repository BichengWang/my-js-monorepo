// @flow
import { sleep } from "./utils";

let user1 = {
  friendList: [2, 3],
  id: 1,
  name: "test-name1",
};

let user2 = {
  friendList: [1, 3],
  id: 2,
  name: "test-name2",
};

let user3 = {
  friendList: [1, 2],
  id: 3,
  name: "test-name3",
};

export async function myDBQuery({ userID }) {
  await sleep(3000);
  console.log("query id record: ", userID);
  const result = {
    1: user1,
    2: user2,
    3: user3,
    node1: {
      records: [
        {
          id: 0,
          record: "row0 \t\trecord1cell1 \t\trecord1cell2 \t\trecord1cell3",
        },
        {
          id: 1,
          record: "row1 \t\trecord1cell1 \t\trecord1cell2 \t\trecord1cell3",
        },
        {
          id: 2,
          record: "row2 \t\trecord1cell1 \t\trecord1cell2 \t\trecord1cell3",
        },
      ],
    },
    node2: {
      records: [
        {
          id: 0,
          record: "row0 \t\trecord1cell1 \t\trecord1cell2",
        },
        {
          id: 1,
          record: "row1 \t\trecord2cell1 \t\trecord2cell2",
        },
        {
          id: 2,
          record: "row2 \t\trecord3cell1 \t\trecord3cell2",
        },
        {
          id: 3,
          record: "row2 \t\trecord4cell1 \t\trecord4cell2",
        },
      ],
    },
  }[userID];
  setTimeout(updateUser, 3000);
  return result;
}

function updateUser() {
  user1 = { name: "new-name1", ...user1 };
  user2 = { name: "new-name2", ...user2 };
  user3 = { name: "new-name3", ...user3 };
}
