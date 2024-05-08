import conf from "../config/config.js";
import { Client, ID, Storage } from "appwrite";

export class Service {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.bucket = new Storage(this.client);
  }

  // file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async getFileDownload(fileId) {
    return this.bucket.getFileDownload(
      conf.appwriteBucketId,
      fileId 
    );
  }
}

const service = new Service();
export default service;
