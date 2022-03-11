import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import FileIcon from "../assets/images/file.svg";
import FolderIcon from "../assets/images/folder.svg";

import styles from "./FileExplorer.module.css";

function FileExplorer({ files = [], handleFileSelected }) {
  return (
    <div className={styles.FileExplorer}>
      {files.length === 0 && (
        <div className={styles.FileExplorerEmpty}>
          The root folder is empty.
        </div>
      )}
      {files.map((file) => (
        <div className={styles.FileExplorerItem} key={file.id}>
          {file.kind === "folder" && (
            <div className={styles.FileExplorerFolder}>
              <FolderIcon className={styles.FileExplorerIcon} />
            </div>
          )}
          {file.kind !== "folder" && (
            <div
              className={styles.FileExplorerFile}
              onClick={() => handleFileSelected(file.id)}
            >
              <FileIcon className={styles.FileExplorerIcon} />
            </div>
          )}
          {file.name}
          {file.kind === "file" && (
            <div className={styles.FileExplorerSize}>{file.size} Kb</div>
          )}
        </div>
      ))}
    </div>
  );
}

FileExplorer.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
};

export default FileExplorer;
