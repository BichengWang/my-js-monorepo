// @flow
import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import {myDBQuery} from '../../utils/my-db-mock-query-component';
import React from 'react';

const currentUserIDState = atom({
  default: 1,
  key: 'CurrentUserID',
});

const userInfoQuery = selectorFamily({
  get: (userID) => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
  key: 'UserInfoQuery',
});

const currentUserInfoQuery = selector({
  get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
  key: 'CurrentUserInfoQuery',
});

const friendsInfoQuery = selector({
  get: ({get}) => {
    const response = get(currentUserInfoQuery);
    const {friendList} = response;
    return friendList.map((friendID) => get(userInfoQuery(friendID)));
  },
  key: 'FriendsInfoQuery',
});

const DataFlowUserInfo = () => {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <button key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
              {friend.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFlowUserInfo;
