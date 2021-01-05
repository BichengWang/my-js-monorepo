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
          value: "row0 record",
        },
        {
          id: 1,
          value: "row1 record",
        },
        {
          id: 2,
          value: "row2 record",
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
