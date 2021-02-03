const axios = require('axios')

const users = []

function userJoin(id, name, familyName, staff, imgsrc, imgName, count){
    const user = { id, name, familyName, staff, imgsrc, imgName, count }

    users.push(user);

    return user
}

//get CurrentUser
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

//get list
function getAllUsers(id){
    return users
}

//user leaves
function userLeave(id){
    const index = users.findIndex(user => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

function tapped(id){
    getCurrentUser(id).count += 1
}

function deleteImg(imgName){
    axios.post('https://www.api.uvsaspark.com/route/api/profile-img-delete', {imgName})
    .then(console.log("done"))
    .catch(error => {
        console.log(error)
    })
}



module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers,
    tapped,
    deleteImg
}
