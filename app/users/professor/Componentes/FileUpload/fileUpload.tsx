import React from "react";
import styles from "./fileUpload.module.css";

interface FileUploadProps {
  text: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ text }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{text}</label>
      <input type="file" className={styles.input} />
    </div>
  );
};

export default FileUpload;
