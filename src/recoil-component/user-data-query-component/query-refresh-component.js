// @flow
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { myDBQuery } from "../../utils/my-db-mock-query-component";
import React, { useEffect } from "react";

const currentUserIDState = atom({
  default: 1,
  key: "CurrentUserID",
});

const userInfoQueryRequestIDState = atom({
  default: 1,
  key: "UserInfoQueryRequestID",
});

const userInfoState = atomFamily({
  default: (userID) => {
    return userID + 1;
  },
  key: "UserInfo",
});

function RefreshUserInfo({ userID }) {
  const refreshUserInfo = useRecoilCallback(
    ({ set }) => async (id) => {
      const userInfo = await myDBQuery({ userID });
      set(userInfoState(userID), userInfo);
    },
    [userID]
  );

  useEffect(() => {
    const intervalID = setInterval(refreshUserInfo, 1000);
    return () => clearInterval(intervalID);
  }, [refreshUserInfo]);

  return null;
}

const userInfoQuery = selectorFamily({
  get: (userID) => async ({ get }) => {
    get(userInfoQueryRequestIDState);
    const response = await myDBQuery({ userID });
    console.log("userInfoQuery, ", JSON.stringify(response));
    return response;
  },
  key: "UserInfoQuery",
});

function useRefreshUserInfo(userID) {
  const setUserInfoQueryRequestID = useSetRecoilState(
    userInfoQueryRequestIDState
  );
  return () => {
    setUserInfoQueryRequestID((requestID) => requestID + 1);
  };
}

const QueryRefreshUserInfo = ({ userID }) => {
  const userInfoQueryRequestID = useRecoilValue(userInfoQueryRequestIDState);
  const currentUserInfo = useRecoilValue(userInfoQuery(userInfoQueryRequestID));
  // const refreshUserInfo = useRefreshUserInfo(currentUserInfo);
  return (
    <div>
      <h1>{currentUserInfo.name}</h1>
      <button onClick={RefreshUserInfo}>Refresh</button>
    </div>
  );
};

export default QueryRefreshUserInfo;
