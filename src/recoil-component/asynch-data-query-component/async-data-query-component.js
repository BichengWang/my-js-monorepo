// @flow
import {atom, selector, selectorFamily, useRecoilValue} from 'recoil';
import {myDBQuery} from '../../utils/my-db-mock-query-component';
import {sleep} from '../../utils/utils';
import React from 'react';

const currentUserIDState = atom({
  default: 1,
  key: 'CurrentUserID',
});

const currentUserNameQuery = selector({
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
  key: 'CurrentUserName',
});

const userNameQuery = selectorFamily({
  get: (userID) => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
  key: 'UserName',
});

function UserInfo({userID}) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

const AsyncUserInfo = ({userID}) => {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
};

export default AsyncUserInfo;
