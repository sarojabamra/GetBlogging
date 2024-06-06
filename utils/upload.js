import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.aiz8lkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  options: { useNewUrlParser: true },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1)
      return `${Date.now()}-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-${file.originalname}`,
    };
  },
});

export default multer({ storage });
