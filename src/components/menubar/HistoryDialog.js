import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, Snackbar, Alert, Fade, Grow, Zoom } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GitCommitHistory from './CommitHistory';  // Assuming you have this import
import { Refresh } from "@mui/icons-material";

const { ipcRenderer } = window.require('electron');

function HistoryDialog({ open, handleClose }) {
    const [commits, setCommits] = useState(null);
    const [infoOpen, setInfoOpen] = useState(false);
    const [commitInfo, setCommitInfo] = useState('');
    const [currentBranch, setCurrentBranch] = useState("");

    useEffect(async () => {
        const branchName = await ipcRenderer.invoke('GF_branchname');
        setCurrentBranch(branchName);
        const commitList = await ipcRenderer.invoke('GH_gethistory', branchName);
        setCommits(commitList);
    }, []);


    const alertOpen = () => {
        setInfoOpen(true);
    }

    const alertClose = () => {
        setInfoOpen(false);
    }

    return (
        <div>
            <Dialog open={open}  TransitionComponent={Zoom} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    Commit History - {currentBranch}
                    <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: '8px', top: '8px' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <GitCommitHistory commits={commits} currentBranch = {currentBranch} infoOpen={alertOpen} infoClose={alertClose} setCommitInfo={setCommitInfo} />
                </DialogContent>
            </Dialog>
            <Snackbar open={infoOpen} autoHideDuration={6000} onClose={alertClose} TransitionComponent={Grow}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    <div dangerouslySetInnerHTML={{ __html: commitInfo.replace(/\n/g, '<br />') }} />
                </Alert>
            </Snackbar>
        </div>
    );
}

export default HistoryDialog;
