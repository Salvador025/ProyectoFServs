import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_KEY,
	},
});

const s3Storage = multerS3({
	s3: s3,
	bucket: process.env.BUCKET_NAME,
	acl: "public-read",
	metadata: (req, file, cb) => {
		cb(null, { ...file });
	},
	key: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: s3Storage,
});

export default upload;
