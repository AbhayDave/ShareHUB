import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uploadSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    files: {
      type: [Schema.Types.ObjectId],
      ref: "File",
      required: true,
    },
  },
  { timestamps: true }
);

export const Upload = mongoose.model("Upload", uploadSchema);
