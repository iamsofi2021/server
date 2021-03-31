const aws = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const s3 = new S3({
    accessKeyId: process.env.s3_id,
    secretAccessKey: process.env.s3_key
});

const uploadFile = (file) => {
    return file;
    // const fileContent = fs.readFileSync(fileName);

    // const params = {
    //     Bucket: process.env.s3_bucketname,
    //     Key: 'cat.jpg',
    //     Body: fileContent
    // };

    // // Uploading files to the bucket
    // s3.upload(params, function(err, data) {
    //     if (err) {
    //         throw err
    //     }
    //     console.log(`File uploaded successfully. ${data.Location}`)
    // });
};

module.exports.uploadFile = uploadFile;
