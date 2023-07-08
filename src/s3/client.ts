import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
//import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// export const createPresignedUrlWithClient = ({
//   region,
//   bucket,
//   key,
// }: {
//   region: string;
//   bucket: string;
//   key: string;
// }) => {
//   const client = new S3Client({ region });
//   const command = new GetObjectCommand({ Bucket: bucket, Key: key });
//   return getSignedUrl(client, command);
// };
