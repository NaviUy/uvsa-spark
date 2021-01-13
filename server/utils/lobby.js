const users = []

function userJoin(id, name, familyName, staff){
    const user = { id, name, familyName, staff }

    users.push(user);

    return user
}

//get CurrentUser
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//get list
function getAllUsers(){
    return users
}

//user leaves
function userLeave(id){
    const index = users.findIndex(user => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}



module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers
}
