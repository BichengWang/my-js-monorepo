import {sleep} from "./utils";

let user1 = {
    id: 1,
    name: 'test-name1',
    friendList: [2, 3],
}

let user2 = {
    id: 2,
    name: 'test-name2',
    friendList: [1, 3],
}

let user3 = {
    id: 3,
    name: 'test-name3',
    friendList: [1, 2],
}

export async function myDBQuery({userID: userID}) {
    await sleep(3000);
    console.log("query id record: ", userID)
    const result = {
        1: user1,
        2: user2,
        3: user3
    }[userID];
    setTimeout(updateUser, 3000)
    return result
}

function updateUser() {
    user1 = {name: "new-name1", ...user1}
    user2 = {name: "new-name2", ...user2}
    user3 = {name: "new-name3", ...user3}
}
