const aws = require( 'aws-sdk' )
const  { REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey, REACT_APP_Bucket } = process.env

const s3 = new aws.S3({
    accessKeyId: REACT_APP_AWSAccessKeyId,
    secretAccessKey: REACT_APP_AWSSecretKey,
    Bucket: REACT_APP_Bucket
   });



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
    if(imgName !== 'default'){
        s3.deleteObject({
            Bucket: 'uvsa-spark',
            Key: imgName
        }, (error) => {
            console.log(error)
        })
    }
}



module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers,
    tapped,
    deleteImg
}
