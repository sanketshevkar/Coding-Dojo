
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Edit from './Edit'
import { connect } from "react-redux";


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    margin: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  chip: {
    margin: theme.spacing(0.5),
  }
});


function Note(props) {
  const { classes,del } = props;

  
  
  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Edit text={props.post.text}/>
              <Button variant="contained" color="secondary" className={classes.addUser} onClick={()=>del(props.post._id,props.auth.user)}>
                Delete
              </Button>
              <Chip
                label={props.post.date}
                className={classes.chip}
                color="default"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper} >
        <Typography color="textSecondary" align="center" >


          {props.post.text}


        </Typography>
      </div>
    </Paper>
  );
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  del: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(withStyles(styles)(Note));
