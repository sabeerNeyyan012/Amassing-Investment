
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import { styles } from "./styles";
const useStyles = makeStyles(styles);
const CustomDialog = ({ title, children, onClose, size, autoWidth, enableFooter, btnCount, ...rest }) => {
    const classes = useStyles()
    return (
        <Dialog {...rest} maxWidth={size} fullWidth={autoWidth} className={classes.root}>
            <DialogTitle className={classes.ModelTopTitle}>{title}
                <IconButton className="close-btn" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog;