import React from 'react';
import {
    atom,
    selector,
    selectorFamily,
    useRecoilValue,
    useRecoilCallback,
    useSetRecoilState,
    waitForAll,
} from 'recoil';
import {myDBQuery} from "../../utils/my-db-mock-query-component";

const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: 1,
});

const userInfoQuery = selectorFamily({
    key: 'UserInfoQuery',
    get: userID => async () => {
        const response = await myDBQuery({userID});
        if (response.error) {
            throw response.error;
        }
        return response;
    },
});

const currentUserInfoQuery = selector({
    key: 'CurrentUserInfoQuery',
    get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
    key: 'FriendsInfoQuery',
    get: ({get}) => {
        const {friendList} = get(currentUserInfoQuery);
        return get(waitForAll(
            friendList.map(friendID => userInfoQuery(friendID))
        ));
    },
});

const PrefetchRequestUserInfo = () => {
    const currentUser = useRecoilValue(currentUserInfoQuery);
    const friends = useRecoilValue(friendsInfoQuery);
    const changeUser = useRecoilCallback(({snapshot, set}) => userID => {
        snapshot.getLoadable(userInfoQuery(userID));// pre-fetch user info
        set(currentUserIDState, userID);// change current user to start new render
    });
    return (
        <div>
            <h1>{currentUser.name}</h1>
            <ul>
                {friends.map(friend =>
                    <li key={friend.id}>
                        <button key={friend.id} onClick={() => changeUser(friend.id)}>
                            {friend.name}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PrefetchRequestUserInfo;