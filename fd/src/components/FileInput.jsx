import { useRef } from "react";

const FileInput = ({ register, setValue }) => {
    const fileRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length === 0) {
            return; // Handle no files selected case (optional)
        }

        if (selectedFiles.length === 1) {
            setValue('files', selectedFiles[0]);
        } else {
            setValue('files', Array.from(selectedFiles));
        }
    };

    return (
        <div className="flex items-center mb-4">
            <input id="files" multiple
                ref={fileRef}
                onChange={handleFileChange}
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
        </div>
    );
};

export default FileInput