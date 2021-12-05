import React, { useCallback, useEffect, useRef } from 'react';
import { useFilePicker } from 'use-file-picker';
import { CSSTransition } from 'react-transition-group';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useStore } from '../stores/store';
import LoadingStatus from '../components/LoadingStatus';
import { LoadingState } from '../workers/LoadingState';
import { FileLoadError } from '../shared/FileLoadError';

import styles from '../styles/BrushFilePicker.module.css'

const StatusCoverSheet: React.FC<{
  show: boolean;
  fileLoadError?: FileLoadError | null;
}> = ({ show, fileLoadError }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition in={show} timeout={200} nodeRef={nodeRef} classNames={{
      ...styles
    }}>
      <div ref={nodeRef} className={`${styles.cover}`}>
        <div className={styles.loadingArea}>
          {fileLoadError && <ErrorDisplay fileLoadError={fileLoadError} />}
          {!fileLoadError && <LoadingStatus />}
        </div>
      </div>
    </CSSTransition>
  );
};

const ErrorDisplay: React.FC<{
  fileLoadError: FileLoadError
}> = ({ fileLoadError }) => {
  const setActiveFile = useStore(state => state.setActiveFile);

  // Clear active file to squash any error messages and state
  const dismissAlert = useCallback(() => {
    setActiveFile(null);
  }, [setActiveFile]);

  return (
    <Alert severity="error" sx={{ width: '100%' }} onClose={dismissAlert}>{fileLoadError.message}</Alert>
  );
};

const BrushFilePicker = () => {
  const setActiveFile = useStore(state => state.setActiveFile);
  const setFileLoadError = useStore(state => state.setFileLoadError);

  const fileInfo = useStore(state => state.fileInfo);
  const fileLoadError = useStore(state => state.fileLoadError);

  const [{ highlighted }, dropRef] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    collect: (monitor) => ({
      highlighted: monitor.canDrop(),
    }),
    drop(item: any) {
      const files: File[] | undefined = item.files;

      if (files?.length === 1) {
        setActiveFile(files[0]);
      } else {
        setFileLoadError({
          message: 'Maximum one file at a time'
        });
      }
    }
  }));

  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: '.abr',
    multiple: false,
    readFilesContent: false
  });

  // Update active file (when it changes)
  useEffect(() => {
    if (plainFiles.length > 0) {
      setActiveFile(plainFiles[0]);
    }
  }, [plainFiles, setActiveFile]);

  const coverWithStatus = fileLoadError || (fileInfo && fileInfo.state !== LoadingState.Done);

  return (
    <div className={`${styles.dropArea} ${highlighted ? styles.highlighted : ''}`} ref={dropRef}>
      <Typography variant="h6">Drag .abr file here, or</Typography>
      <Button variant="outlined" onClick={() => openFileSelector()}>Open file</Button>
      <Typography variant="body1">Contents are stored in memory and will not be uploaded to any server.</Typography>
      <StatusCoverSheet show={!!coverWithStatus} fileLoadError={fileLoadError} />
    </div>
  )
};

export default BrushFilePicker;
