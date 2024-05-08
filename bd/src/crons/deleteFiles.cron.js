// const cron = require("node-cron");

import {Upload} from "../models/Upload.model.js"


export async function deleteOldUploads() {
  try {
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() - 1); // Go back 24 hours

    const deletedCount = await Upload.deleteMany({
      createdAt: { $lt: deletionDate }, // Filter for documents older than 24 hours
    });

    console.log(`Deleted ${deletedCount} old Upload documents.`);
  } catch (error) {
    console.error("Error deleting old uploads:", error);
  }
}

