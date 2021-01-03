// @flow
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil';
import {myDBQuery} from '../../utils/my-db-mock-query-component';
import {sleep} from '../../utils/utils';
import React from 'react';

const currentUserIDState = atom({
  default: 1,
  key: 'CurrentUserID',
});

const userInfoQueryRequestIDState = atom({
  default: 1,
  key: 'UserInfoQueryRequestID',
});

const userInfoQuery = selectorFamily({
  get: (userID) => async ({get}) => {
    get(userInfoQueryRequestIDState);
    const response = await myDBQuery({userID});
    // if (response.error) {
    //   throw response.error;
    // }
    console.log("userInfoQuery, ", JSON.stringify(response))
    return response;
  },
  key: 'UserInfoQuery',
});

function useRefreshUserInfo(userID) {
  const setUserInfoQueryRequestID = useSetRecoilState(
    userInfoQueryRequestIDState
  );
  return () => {
    setUserInfoQueryRequestID((requestID) => requestID + 1);
  };
}

const QueryRefreshUserInfo = ({userID}) => {
  const userInfoQueryRequestID = useRecoilValue(userInfoQueryRequestIDState);
  const currentUserInfo = useRecoilValue(userInfoQuery(userInfoQueryRequestID));
  const refreshUserInfo = useRefreshUserInfo(currentUserInfo);
  return (
    <div>
      <h1>{currentUserInfo.name}</h1>
      <button onClick={refreshUserInfo}>Refresh</button>
    </div>
  );
};

export default QueryRefreshUserInfo;
