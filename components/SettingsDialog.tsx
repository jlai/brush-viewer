import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';

import CloseIcon from '@mui/icons-material/Close';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/system/Box';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useStore } from '../stores/store';
import { validatePattern } from '../shared/NameUtils';

const DialogHeader: React.FC<{
    onClose?: () => (void)
}> = ({ onClose }) => (
    <DialogTitle>
        <Grid container direction="row" alignItems="center">
            <Grid item flexGrow={1}>Settings</Grid>
            <IconButton onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </Grid>
    </DialogTitle>
);

const PatternEditor: React.FC<{
    options: string[],
    onInputChange: any,
    inputValue: string,
} & TextFieldProps> = ({ options, onInputChange, inputValue, ...props }) => (
    <Autocomplete
        freeSolo
        autoComplete={false}
        filterOptions={(x) => x}
        options={options}
        onInputChange={onInputChange}
        inputValue={inputValue}
        renderInput={
            (params) => <TextField {...params} {...props} />
        } />
);

const EXAMPLE_PATTERNS = [
    '%f/%b',
    '%f/%f - %n',
    '%f/%n - %f',
    'Brush %0n'
];

const SettingsDialog: React.FC<{
    open: boolean;
    onClose?: () => (void);
}> = ({ open, onClose }) => {
    const defaultImageNamePattern = useStore(state => state.defaultImageNamePattern);
    const imageNamePattern = useStore(state => state.imageNamePattern);
    const setImageNamePattern = useStore(state => state.setImageNamePattern);
    const [pattern, setPattern] = useState(imageNamePattern);

    const patternValidity = validatePattern(pattern);
    const isValid = patternValidity.ok;

    const saveClick = useCallback(() => {
        setImageNamePattern(pattern);
        onClose?.();
    }, [pattern, setImageNamePattern, onClose]);

    const loadDefaultsClick = useCallback(() => {
        setPattern(defaultImageNamePattern);
    }, [setPattern, defaultImageNamePattern]);

    const updatePattern = useCallback((event: ChangeEvent<HTMLInputElement>, value: string) => {
        setPattern(value);
    }, [setPattern]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogHeader onClose={onClose} />
            <DialogContent>
                <Box sx={{ p: '16px' }}>
                    <Box sx={{ mb: '16px' }}>
                        <Typography variant="h6">Set the pattern used to name image files</Typography>
                        <DialogContentText><code>%f</code> - brush set name</DialogContentText>
                        <DialogContentText><code>%b</code> - brush name, if present, otherwise number</DialogContentText>
                        <DialogContentText><code>%n</code> - brush number (automatic leading zeroes)</DialogContentText>
                        <DialogContentText><code>%0n</code> - brush number (no leading zeroes)</DialogContentText>
                        <DialogContentText><code>%3n</code> - brush number (zero-padded to 3 digits)</DialogContentText>
                        <DialogContentText><code>/</code> - folder separator</DialogContentText>
                    </Box>
                    <PatternEditor
                        options={EXAMPLE_PATTERNS}
                        label="Image Name Pattern"
                        inputValue={pattern}
                        onInputChange={updatePattern}
                        error={!patternValidity.ok}
                        helperText={patternValidity.message || "Pattern without file extension"}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={loadDefaultsClick}>Load Defaults</Button>
                <Button variant="contained" onClick={saveClick} disabled={!isValid}>Save</Button>
            </DialogActions>
        </Dialog >
    );
};

export default SettingsDialog;
