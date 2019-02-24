import React from 'react';
import {
  Label,
  Grid,
  Header,
  Button,
  Image
} from 'semantic-ui-react'

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
    super(props)
  }

  async componentWillMount() {}

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
    <Button style={styles.uploadButton} content='Upload Image' icon='upload' labelPosition='left' />
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
