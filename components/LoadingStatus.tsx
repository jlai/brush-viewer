import { Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { useStore } from '../stores/store';
import styles from '../styles/LoadingStatus.module.css'
import { BrushFileInfo } from '../workers/BrushFileWorker';

const ErrorInfo: React.FC<{
  errorText: string;
}> = ({ errorText }) => (
  <Typography variant="subtitle1">
    Error: {errorText}
  </Typography>
);

const ProgressText: React.FC<{
  fileInfo: BrushFileInfo
}> = ({ fileInfo }) => (
  <Typography variant="subtitle1" sx={{ mt: '16px' }}>
    {fileInfo.decodedBrushes} / {fileInfo.totalBrushes}
  </Typography>
);

const LoadingStatus = () => {
  const fileInfo = useStore(state => state.fileInfo);

  let progress = 0;

  if (fileInfo && fileInfo.totalBrushes) {
    progress = 100 * (fileInfo.decodedBrushes || 0) / fileInfo.totalBrushes;
  }

  return (
    <div className={styles.loadingStatus}>
      <LinearProgress variant="determinate" value={progress} />
      {fileInfo?.totalBrushes && <ProgressText fileInfo={fileInfo} />}
      {fileInfo?.errorText && <ErrorInfo errorText={fileInfo.errorText} />}
    </div>
  );
}

export default LoadingStatus;
