import React from 'react';
import {
  Label,
  Grid,
  Header,
  Button,
  Image
} from 'semantic-ui-react'
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import firebase from "firebase";

import HereMap from './HereMap';

const styles = {
  step: {
    marginLeft: '10px',
    fontSize: '1.4em'
  },

  uploadButton: {
    marginTop: '40px'
  },

  sectionOtherSpottings: {
    fontSize: '1.4em',
    marginTop: '40px',
    marginBottom: '20px'
  },

  sectionMap: {
    marginTop: '40px',
    width: '100%',
    height: '480px'
  }

}

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      progress: 0,
      newUrl: ''
    }
    var config = {
        "apiKey": "AIzaSyAviP5BdXqcBr409cY78pu0goV60t_uofY",
        "authDomain": "developer-week-2019.firebaseapp.com",
        "databaseURL": "https://developer-week-2019.firebaseio.com",
        "storageBucket": "developer-week-2019.appspot.com",
    };
    firebase.initializeApp(config);
  }

  async componentWillMount() {}

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    console.log(error);
    this.setState({ isUploading: false });
    alert('Failed to upload photo');
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        this.setState({ newUrl: url })
      });
  };

  render = () => {
    return <div>
    <Grid columns='equal'>
      <Grid.Column>
        <Label circular color='olive' size='large'> 1 </Label>
        <span style={styles.step}>Take a photo</span>
      </Grid.Column>
      <Grid.Column>
        <Label circular color='olive' size='large'> 2 </Label>
        <span style={styles.step}>Upload it</span>
      </Grid.Column>
      <Grid.Column>
        <Label circular color='olive' size='large'> 3 </Label>
        <span style={styles.step}>Identify it</span>
      </Grid.Column>
    </Grid>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CustomUploadButton style={styles.uploadButton}
        accept="image/*"
        storageRef={firebase.storage().ref('images')}
        onUploadStart={this.handleUploadStart}
        onUploadError={this.handleUploadError}
        onUploadSuccess={this.handleUploadSuccess}
        onProgress={this.handleProgress}
        style={{marginTop: '40px',
        backgroundColor: '#b5ca31',
        width: '180px',
        color: 'white',
        padding: 10,
        borderRadius: 4,
        display: 'block'}}
      >
        Upload Image
      </CustomUploadButton>
    </div>
    <div style={styles.sectionOtherSpottings}>Other Spottings Near You!</div>
    <Grid>
      <Grid.Row columns={5}>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <HereMap style={styles.sectionMap}/>
    </div>
  }
}

export default LandingPage;
