import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3();

export const getPresignedUrl = async (fileType, folder) => {
    const ext = fileType.split("/")[1];
    const key = `${folder}/${uuidv4()}.${ext}`;

    const uploadUrl = await s3.getSignedUrlPromise("putObject", {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ContentType: fileType,
        Expires: 60,
        ACL: "public-read",
    });

    return {
        uploadUrl,
        fileUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
    };
};
