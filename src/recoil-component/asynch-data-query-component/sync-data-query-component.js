import React from 'react';
import {
    atom,
    selector,
    selectorFamily,
    useRecoilValue,
} from 'recoil';
import {sleep} from "../../utils/utils";

const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: 1,
});

function myDBQuery({userID: userID}) {
    return {
        1: {
            id: 1,
            name: 'test-name1'
        },
        2: {
            id: 2,
            name: 'test-name2'
        }
    }[userID];
}

const currentUserNameQuery = selector({
    key: 'CurrentUserName',
    get: async ({get}) => {
        const response = await myDBQuery({
            userID: get(currentUserIDState),
        });
        if (response.error) {
            throw response.error;
        }
        return response.name;
    },
});

const userNameQuery = selectorFamily({
    key: 'UserName',
    get: userID => {
        return myDBQuery(userID)
    }
});

function UserInfo({userID}) {
    const userName = useRecoilValue(userNameQuery(userID));
    return <div>{userName}</div>;
}

const SyncUserInfo = ({userID}) => {
    const userName = useRecoilValue(userNameQuery(userID));
    return <div>{userName}</div>;
}

export default SyncUserInfo;