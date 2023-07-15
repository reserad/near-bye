import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "react-native-url-polyfill/auto";

export enum Buckets {
  PROFILE_IMAGES = "near-bye-profile-images",
}

export const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadImage = async ({
  fileName,
  body,
  type,
}: {
  body: Blob;
  fileName: string;
  type: string;
}) => {
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: Buckets.PROFILE_IMAGES,
        Body: body,
        Key: fileName,
        ContentType: type,
      }),
    );
    return await getSignedUrl(
      client,
      new GetObjectCommand({ Bucket: Buckets.PROFILE_IMAGES, Key: fileName }),
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
