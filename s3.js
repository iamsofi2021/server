const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: process.env.s3_id,
    secretAccessKey: process.env.s3_key,
    region: process.env.region
});

// aws.config.update({
//     accessKeyId: 'AKIASN3ESZAQDZ3P3X4P',
//     secretAccessKey: '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',
//     region: 'us-east-2'
// });

const s3 = new aws.S3();
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
            || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
    },
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'sofi-images',
        key: function (req, file, cb) {
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
        },
        contentType: function (req, file, cb) {
            cb(null, file.mimetype);
        }
    })
});

const getList = () => {
    var p = new Promise(function (resolve, reject) {
        s3.listObjects({ Bucket: process.env.s3_bucketname }, function (err, data) {
            if (err) {
                return reject(err);
            }

            resolve(data.Contents);
        });
    });

    return p;
}

const getImage = (key) => {
    var p = new Promise(function (resolve, reject) {
        s3.getObject({ Bucket: process.env.s3_bucketname, Key: key }, function (err, data) {
            if (err) {
                return reject(err);
            }

            resolve(data);
        });
    });

    return p;
}


module.exports.upload = upload;
module.exports.getList = getList;
module.exports.getImage = getImage;
