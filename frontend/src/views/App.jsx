import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "use-interval";

import FileExplorer from "../components/FileExplorer";
import FileContent from "../components/FileContent";
import { refreshFiles } from "../store/files/files-actions";
import { selectFile } from "../store/filemanager/filemanager-actions";

import styles from "./App.module.css";

// const POLL_INTERVAL = 5000;

function App() {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    dispatch(refreshFiles(files));
  }, [files]);

  useEffect(() => {
    dispatch(selectFile(file));
  }, [file]);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`/api/files`);
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // useInterval(
  //   () => {
  //     dispatch(refreshFiles(files));
  //   },
  //   POLL_INTERVAL,
  //   true
  // );

  const handleFileSelected = (id) => {
    setFile(files.find((f) => f.id === id));
  };

  const { list } = useSelector((store) => store.files);
  const { selectedFile } = useSelector((store) => store.filemanager);

  return (
    <div className={styles.App}>
      <FileExplorer files={list} handleFileSelected={handleFileSelected} />
      <FileContent file={selectedFile} />
    </div>
  );
}

export default App;
