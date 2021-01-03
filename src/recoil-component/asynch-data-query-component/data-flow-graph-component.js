import React from 'react';
import {
    atom,
    selector,
    selectorFamily, useRecoilState,
    useRecoilValue, useSetRecoilState,
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
        const response = get(currentUserInfoQuery);
        const {friendList} = response;
        return friendList.map(friendID => get(userInfoQuery(friendID)));
    },
});

const DataFlowUserInfo = () => {
    const currentUser = useRecoilValue(currentUserInfoQuery);
    const friends = useRecoilValue(friendsInfoQuery);
    const setCurrentUserID = useSetRecoilState(currentUserIDState);
    return (
        <div>
            <h1>{currentUser.name}</h1>
            <ul>
                {friends.map(friend =>
                    <li key={friend.id}>
                        <button key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
                            {friend.name}
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default DataFlowUserInfo;