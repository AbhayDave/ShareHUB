import { File } from "../models/File.model.js";
import { Upload } from "../models/Upload.model.js";
import { sendEmail } from "../utils/mailService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


export const createLink = async (req, res) => {
  try {
    const { name, files } = req.body;

    if (!files) {
      throw new ApiError(400, "All fields are required");
    }

    const uploadedFiles = JSON.parse(files);

    const uploadedFileIds = [];

    for (const file of uploadedFiles) {
      const createdFile = await File.create({
        filename: file.name,
        fileId: file.id,
        size: file.size,
        bucketId: file.bucketId,
      });
      if (!createdFile) {
        throw new ApiError(500, "Something went wrong while storing file Ids");
      }
      uploadedFileIds.push(createdFile._id);
    }

    const uploadDocument = await Upload.create({
      owner: req.user?._id,
      name: name,
      files: uploadedFileIds,
    });

    if (!uploadDocument) {
      throw new ApiError(
        500,
        "Something went wrong while creating the transfer"
      );
    }

    const downloadLink = `http://localhost:5173/download/${uploadDocument._id}`; // Replace with your link generation logic

    return res
      .status(201)
      .json(new ApiResponse(200, uploadDocument, "Link Created Successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Creating the Transfer" });
  }
};

export const sendMail = async (req, res) => {
  const { name, email, files, recipentemail, senderName, message, subject } =
    req.body;

  // Validate required fields
  if (
    [email, files, recipentemail, senderName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const uploadedFiles = JSON.parse(files);

  // console.log(uploadedFiles);

  const uploadedFileIds = [];

  try {
    for (const file of uploadedFiles) {
      const createdFile = await File.create({
        filename: file.name,
        fileId: file.id,
        size: file.size,
        bucketId: file.bucketId,
      });

       if (!createdFile) {
         throw new ApiError(500, "Something went wrong while storing file Ids");
       }

      uploadedFileIds.push(createdFile._id);
    }

    

    const uploadDocument = await Upload.create({
      owner: req.user?._id,
      name: name,
      files: uploadedFileIds,
    });

    if (!uploadDocument) {
      throw new ApiError(
        500,
        "Something went wrong while creating the transfer"
      );
    }


    const downloadLink = `http://localhost:5173/download/${uploadDocument._id}`; // Replace with your link generation logic

    // console.log(downloadLink);

    // Send email to the recipient with the download link
    await sendEmail(
      email, recipentemail,
      senderName,
      subject,
      message,
      downloadLink
    );


    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { uploadDocument, downloadLink },
          "Transfer Created successfully"
        )
      );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Creating the Transfer" });
  }
};

export const downloadFiles = async (req, res) => {
  try {
    const id = req.params.id;
    const upload = await Upload.findOne({ _id: id });
   
    // Link expired
    if (!upload) {
      return res.json({ error: "Link has been expired." });
    }

    const files = await Promise.all(
      upload.files.map(async (fileID) => {
        const foundFile = await File.findOne({ _id: fileID });
        if (!foundFile) {
          // Handle the case where the file is not found (optional)
          console.warn(`File with ID ${fileID} not found in the database.`);
          return null; // Or throw an error if encountering a missing file is critical
        }
        return foundFile;
      })
    );

    return res.send([...files]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Something went wrong." });
  }
};


export const getAllTransfers = async (req, res) => {

  try {
  
      const owner = req.user?._id;


      const uploadsByUser = await Upload.find({ owner: owner });

      return res.send(uploadsByUser);

    
  } catch (error) {
    console.log(err);
    return res.status(500).send({ error: "Something went wrong." });
  }

}