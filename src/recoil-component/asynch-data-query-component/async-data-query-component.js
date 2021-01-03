import React from 'react';
import {
    atom,
    selector,
    selectorFamily,
    useRecoilValue,
} from 'recoil';
import {sleep} from "../../utils/utils";
import {myDBQuery} from "../../utils/my-db-mock-query-component";

const currentUserIDState = atom({
    key: 'CurrentUserID',
    default: 1,
});

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
    get: userID => async () => {
        const response = await myDBQuery({userID});
        if (response.error) {
            throw response.error;
        }
        return response.name;
    },
});

function UserInfo({userID}) {
    const userName = useRecoilValue(userNameQuery(userID));
    return <div>{userName}</div>;
}

const AsyncUserInfo = ({userID}) => {
    const userName = useRecoilValue(userNameQuery(userID));
    return <div>{userName}</div>;
}

export default AsyncUserInfo;