import React, { Fragment, useState } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Form, TextArea } from 'semantic-ui-react'
import { connect } from "react-redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Edit(props) {


   const [post, setPost] = useState(props.text.text)


   const onSubmit = (e) => {
       e.preventDefault();
       props.edit(post,props.auth.user,props.text._id)
       handleClose()
       setPost({  text:"" });
   }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment >
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Post
        </DialogTitle>
        <DialogContent dividers>
        <DialogContent dividers>
        <Form>
    <TextArea style={{ minHeight: 100, width: 500}}  value={post} onChange={e => setPost(e.target.value)}/>
  </Form>
        </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      </Fragment>
  );
}

Edit.propTypes = {
  text: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Edit);
