const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
const http = require('http')
const dotenv = require('dotenv').config()
const cors = require('cors')

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */

const app = express()
const server = http.createServer(app)
const router = express.Router(server)

app.use(cors())

/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
     accessKeyId: process.env.REACT_APP_ACCESS_KEY,
     secretAccessKey: process.env.REACT_APP_SECRET_KEY,
     region: process.env.REACT_APP_REGION
   });

   /**
 * Single Upload
 */
const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'uvsa-spark',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 10000000 }, // In bytes: 10,000,000 bytes = 10 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage')

   /**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */

function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase())
    // Check mime
    const mimetype = filetypes.test( file.mimetype )

    if( mimetype && extname ){
        return cb( null, true )
       } else {
        cb( 'Error: Images Only!' )
       }
}

router.post( '/profile-img-upload', ( req, res ) => {

    // console.log("connected");
    // console.log(aws)
    // console.log(s3)

    profileImgUpload( req, res, ( error ) => {
        // console.log( 'requestOkokok', req.file );
        // console.log( 'error', error );
        // console.log(req)
        if( error ){
         console.log( 'errors', error )
         res.json( { error: error } )
        } else {
         // If File not found
         if( req.file === undefined ){
          console.log( 'Error: No File Selected!' )
          res.json( 'Error: No File Selected' )
         } else {
          // If Success
          const imageName = req.file.key;
          const imageLocation = req.file.location;

          res.json( {
            image: imageName,
            location: imageLocation
           })
          }
        }
    })
})

router.post( '/profile-img-delete', (req, res) => {
    if(req.body.imgName !== 'default'){
        s3.deleteObject({
        Bucket: 'uvsa-spark',
        Key: req.body.imgName
        }, (error) => {
         if(error !== null){
             console.log(error)
            } else {
                console.log(req.body.imgName + " has been deleted.")
        }
        })
    }
	res.end()
})

module.exports = router;
