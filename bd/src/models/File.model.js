import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: { type: String, required: true },
    fileId: { type: String, required: true },
    size: { type: Number, required: true },
    bucketId: { type: String, required: true },
});

export const File = mongoose.model('File', fileSchema);