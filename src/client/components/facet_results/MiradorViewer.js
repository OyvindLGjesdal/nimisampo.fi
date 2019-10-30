import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import iiifLogo from '../../img/logos//logo-iiif-34x30.png';


const styles = () => ({
  viewerContainer: {
    height: '100%',
    width: '100%',
  },
  dialogPaper: {
    height: '100%',
    width: '100%',
    minWidth: 600,
    maxWidth: 1500,
    maxHeight: 900,
    padding: '0px !important'
  },
  dialogContent: {
    padding: '0px !important'
  },
  appBarButton: {
    color: 'white !important',
  },
  // https://benmarshall.me/responsive-iframes/
  iframeContainer: {
    overflow: 'hidden',
    paddingTop: '93%',   // aspect ratio: 700 / 750
    position: 'relative'
  },
  iframe: {
    border: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  spinner: {
    height: 40,
    width: 40,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 500
  },

});

class MiradorViewer extends React.Component {
  state = {
    open: false,
    zoomMessage: '',
    loading: true
  };

  hideSpinner = () => {
    this.setState({
      loading: false
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, strings } = this.props;

    return (
      <div>
        <Button
          className={classes.appBarButton}
          classes={{ label: classes.buttonLabel }}
          onClick={this.handleClickOpen}
        ><img src={iiifLogo} alt="IIIF logo" />       
        </Button>
        <Dialog
          classes={{
            container: classes.dialogContainer,
            paper: classes.dialogPaper
          }}
          maxWidth={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
        >
          <DialogContent className={classes.dialogContent} >
            {this.state.loading ? (
              <div className={classes.spinner}>
                <CircularProgress thickness={5} />
              </div>
            ) : null }
            <div className={classes.iframeContainer}>
              <iframe
                className={classes.iframe}
                src={'https://ubbdst.github.io/viewer/viewer.html?manifest=' + this.props.manifest}
                onLoad={this.hideSpinner}
              />
            </div>

          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

MiradorViewer.propTypes = {
  classes: PropTypes.object.isRequired,
  strings: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiradorViewer);
