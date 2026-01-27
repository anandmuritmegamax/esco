import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import getSettingsByGroup from "./getSettingsByGroup.js";

/**
 * Generate S3 presigned URL using AWS settings from DB
 */
export const getPresignedUrl = async (fileType, folder) => {
    // 🔹 Fetch AWS settings from DB
    const awsSettings = await getSettingsByGroup("aws");

    if (
        !awsSettings["aws.accessKeyId"] ||
        !awsSettings["aws.secretAccessKey"] ||
        !awsSettings["aws.region"] ||
        !awsSettings["aws.s3Bucket"]
    ) {
        throw new Error("AWS settings are not configured");
    }

    // 🔹 Configure AWS dynamically
    AWS.config.update({
        accessKeyId: awsSettings["aws.accessKeyId"],
        secretAccessKey: awsSettings["aws.secretAccessKey"],
        region: awsSettings["aws.region"],
    });

    const s3 = new AWS.S3();

    // 🔹 Generate unique key
    const ext = fileType.split("/")[1];
    const key = `${folder}/${uuidv4()}.${ext}`;

    // 🔹 Create presigned URL
    const uploadUrl = await s3.getSignedUrlPromise("putObject", {
        Bucket: awsSettings["aws.s3Bucket"],
        Key: key,
        ContentType: fileType,
        Expires: 60, // seconds
        ACL: "public-read",
    });

    return {
        uploadUrl,
        fileUrl: `https://${awsSettings["aws.s3Bucket"]}.s3.${awsSettings["aws.region"]}.amazonaws.com/${key}`,
    };
};


// import AWS from "aws-sdk";
// import { v4 as uuidv4 } from "uuid";

// console.log("AWS S3 Utility Loaded", process.env.AWS_S3_BUCKET);
// console.log("AWS Region:", process.env.AWS_REGION);
// AWS.config.update({
//     region: process.env.AWS_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
// });

// const s3 = new AWS.S3();

// export const getPresignedUrl = async (fileType, folder) => {
//     const ext = fileType.split("/")[1];
//     const key = `${folder}/${uuidv4()}.${ext}`;

//     const uploadUrl = await s3.getSignedUrlPromise("putObject", {
//         Bucket: process.env.AWS_S3_BUCKET,
//         Key: key,
//         ContentType: fileType,
//         Expires: 60,
//         ACL: "public-read",
//     });

//     return {
//         uploadUrl,
//         fileUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
//     };
// };
