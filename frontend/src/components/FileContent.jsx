import React from "react";
import PropTypes from "prop-types";

import styles from "./FileContent.module.css";

function FileContent({ file = null }) {
  return (
    <div className={styles.FileContent}>
      {file && file.content === "" && <div>No content</div>}
      <pre>{file?.content && atob(file.content)}</pre>
    </div>
  );
}

FileContent.propTypes = {
  file: PropTypes.object,
};

export default FileContent;
