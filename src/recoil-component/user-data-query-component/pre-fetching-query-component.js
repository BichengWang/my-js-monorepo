// @flow
import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
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
    const {friendList} = get(currentUserInfoQuery);
    return get(
      waitForAll(friendList.map((friendID) => userInfoQuery(friendID)))
    );
  },
  key: 'FriendsInfoQuery',
});

const PrefetchRequestUserInfo = () => {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const changeUser = useRecoilCallback(({snapshot, set}) => (userID) => {
    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
    set(currentUserIDState, userID); // change current user to start new render
  });
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <button key={friend.id} onClick={() => changeUser(friend.id)}>
              {friend.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrefetchRequestUserInfo;
