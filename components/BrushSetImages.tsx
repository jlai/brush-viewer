import { useCallback } from 'react';
import Image, { ImageLoader } from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { useStore } from '../stores/store';
import { BrushRef } from '../workers/BrushFileWorker';
import styles from '../styles/BrushSetImages.module.css';

const loader: ImageLoader = ({ src }) => src;

const BrushImage: React.FC<{
  brush: BrushRef
}> = ({ brush }) => {
  const fileName = useStore(state => state.getImageFileName(brush.brushNum));
  const trimmedFileName = fileName?.replace(/^.*\//g, '');

  const onClick = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  return (
    <a href={brush.url} download={trimmedFileName} onClick={onClick}>
      <Image
        src={brush.url}
        width={150}
        height={150}
        unoptimized
        loader={loader}
        alt={`Brush ${brush.brushNum}`}
        style={{objectFit: "scale-down", objectPosition: "center center"}}
        />
    </a>
  );
};

const BrushCard: React.FC<{
  brush: BrushRef
}> = ({ brush }) => {
  const title = (
    <div className={styles.tooltip}>
      <div>Brush {brush.brushNum}</div>
      <div>{brush.width} x {brush.height}</div>
    </div>
  );

  return (
    <Tooltip title={title}>
      <Paper elevation={6} sx={{ width: 200, height: 200, backgroundColor: 'black' }}>
        <Grid container alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%" }}>
          <BrushImage brush={brush} />
        </Grid>
      </Paper>
    </Tooltip>
  )
};

const BrushSetViewer: React.FC<any> = () => {
  const brushes = useStore(state => state.brushes) || [];

  return (
    <Grid container alignItems="center" justifyContent="center" gap="8px" rowGap="48px" sx={{ mt: '64px', mb: '64px' }}>
      {brushes.map((brush: BrushRef) =>
        <Grid item xs={3} key={brush.url}><BrushCard brush={brush} /></Grid>)}
    </Grid>
  );
};

export default BrushSetViewer;
