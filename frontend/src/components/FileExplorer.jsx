import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FileIcon from "../assets/images/file.svg";
import FolderIcon from "../assets/images/folder.svg";

import styles from "./FileExplorer.module.css";

function FileExplorer({ files = [], handleFileSelected, selectedFile }) {
  const renderChildren = (childFiles, handleFile, selectFile) => {
    return childFiles.map((file) => {
      return (
        <>
          <div
            className={
              selectFile && selectFile.id === file.id
                ? `${styles.SelectedItem} ${styles.FileExplorerItem}`
                : `${styles.FileExplorerItem}`
            }
            key={file.id}
            onClick={() => handleFile(file)}
          >
            {file.kind === "folder" && (
              <FolderIcon className={styles.FileExplorerIcon} />
            )}
            {file.kind !== "folder" && (
              <FileIcon className={styles.FileExplorerIcon} />
            )}
            <div className={styles.FileExplorerName}>{file.name}</div>

            {file.kind === "file" && (
              <div className={styles.FileExplorerSize}>
                {Math.ceil(file.size / 1024)} Kb
              </div>
            )}
          </div>
          <div key={file.name} className={styles.ChildItem}>
            {file.children &&
              renderChildren(file.children, handleFile, selectFile)}
          </div>
        </>
      );
    });
  };

  return (
    <div className={styles.FileExplorer}>
      {files.length === 0 && (
        <div className={styles.FileExplorerEmpty}>
          The root folder is empty.
        </div>
      )}
      {files.map((file) => (
        <>
          <div
            className={
              selectedFile && selectedFile.id === file.id
                ? `${styles.SelectedItem} ${styles.FileExplorerItem}`
                : `${styles.FileExplorerItem}`
            }
            key={file.id}
            onClick={() => handleFileSelected(file)}
          >
            {file.kind === "folder" && (
              <FolderIcon className={styles.FileExplorerIcon} />
            )}
            {file.kind !== "folder" && (
              <FileIcon className={styles.FileExplorerIcon} />
            )}
            <div className={styles.FileExplorerName}>{file.name}</div>

            {file.kind === "file" && (
              <div className={styles.FileExplorerSize}>
                {Math.ceil(file.size / 1024)} Kb
              </div>
            )}
          </div>
          <div key={file.name} className={styles.ChildItem}>
            {file.children &&
              renderChildren(file.children, handleFileSelected, selectedFile)}
          </div>
        </>
      ))}
    </div>
  );
}

FileExplorer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileExplorer;
