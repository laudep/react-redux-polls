export const RECEIVE_USERS = "RECEIVE_USERS"
export const SAVE_USER_VOTE = 'SAVE_USER_VOTE'
export const REMOVE_USER_VOTE = 'REMOVE_USER_VOTE'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUserVote(user, id, answer) {
    return {
        type: SAVE_USER_VOTE,
        user,
        id,
        answer
    }
}

export function removeUserVote(user, id, answer) {
    return {
        type: REMOVE_USER_VOTE,
        user,
        id,
        answer
    }
}