const aws = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const s3 = new S3({
    accessKeyId: process.env.s3_id,
    secretAccessKey: process.env.s3_key
});

const uploadFile = (file) => {
    const fileContent = fs.readFileSync(file);

    const params = {
        Bucket: process.env.s3_bucketname,
        Key: file.name,
        Body: file
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    });
};

module.exports.uploadFile = uploadFile;
