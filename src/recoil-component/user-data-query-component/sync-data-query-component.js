// @flow
import { atom, selector, selectorFamily, useRecoilValue } from "recoil";
import React from "react";

const currentUserIDState = atom({
  default: 1,
  key: "CurrentUserID",
});

function myDBQuery({ userID }) {
  return {
    1: {
      id: 1,
      name: "test-name1",
    },
    2: {
      id: 2,
      name: "test-name2",
    },
  }[userID];
}

const currentUserNameQuery = selector({
  get: async ({ get }) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
  key: "CurrentUserName",
});

const userNameQuery = selectorFamily({
  get: (userID) => {
    return myDBQuery(userID);
  },
  key: "UserName",
});

function UserInfo({ userID }) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

const SyncUserInfo = ({ userID }) => {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
};

export default SyncUserInfo;
