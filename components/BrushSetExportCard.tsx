import { useCallback, useState } from 'react';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadingIcon from '@mui/icons-material/Downloading';
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

import { useStore } from "../stores/store";
import SettingsDialog from './SettingsDialog';

const ExampleFileNamePreview = () => {
  const exampleFileName = useStore(state => state.getImageFileName(1));
  const [settingsOpen, setSettingsOpen] = useState(false);
  const openSettings = useCallback(() => setSettingsOpen(true), [setSettingsOpen]);
  const closeSettings = useCallback(() => setSettingsOpen(false), [setSettingsOpen]);

  return (
    <>
      <TextField
        fullWidth
        variant="filled"
        value={exampleFileName}
        label="Images inside zip will be named like"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={openSettings}>Configure</Button>
            </InputAdornment>
          )
        }}
      />
      <SettingsDialog open={settingsOpen} onClose={closeSettings} />
    </>
  );
};

const ExportNameField = () => {
  const exportName = useStore(state => state.exportName);
  const setExportName = useStore(state => state.setExportName);

  return (
    <TextField
      fullWidth
      label="Brush Set Name"
      helperText="Name used for zip file (excluding .zip)"
      value={exportName || ''}
      onChange={(event) => setExportName(event.target.value)}
    />
  );
};

const BrushSetExportCard = () => {
  const [exporting, setExporting] = useState(false);

  const fileInfo = useStore(state => state.fileInfo);
  const exportToZip = useStore(state => state.exportToZip);
  const showingExportSettings = useStore(state => state.showingExportSettings);
  const setShowingExportSettings = useStore(state => state.setShowingExportSettings);

  const handleExportClick = useCallback(() => {
    (async () => {
      setExporting(true);
      await exportToZip();
      setExporting(false);
    })();
  }, [exportToZip]);

  return (
    <Card>
      <CardHeader
        title={fileInfo?.fileName}
        action={
          <IconButton aria-label="settings" onClick={() => setShowingExportSettings(!showingExportSettings)}>
            <SettingsIcon />
          </IconButton>
        } />
      <Collapse in={showingExportSettings} timeout="auto">
        <CardContent>
          <Grid container gap="24px">
            <ExportNameField />
            <ExampleFileNamePreview />
          </Grid>
        </CardContent>
      </Collapse>
      <CardActions>
        <Button
          variant="contained"
          onClick={handleExportClick}
          endIcon={exporting ? <DownloadingIcon /> : <DownloadIcon />}
        >Export {fileInfo?.totalBrushes} Images As Zip</Button>
      </CardActions>
    </Card>
  );
};

export default BrushSetExportCard;
