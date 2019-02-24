import React from 'react';
import {
  Label,
  Grid,
  Header,
  Button,
  Image
} from 'semantic-ui-react'
// First way to import
import {
  ClipLoader
} from 'react-spinners';

class HereMap extends React.Component {

  constructor(props) {
    super(props);
    const {
      style
    } = props;

    this.style = style;

    this.platform = new window.H.service.Platform({
      'app_id': '4c44HqHW1MFRVHTOF77q',
      'app_code': 'BsTdDoavvrz6EFyyqFn1Qw'
    });

    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.setState({
        loading: false
      })
      const {
        latitude,
        longitude
      } = position.coords || {
        latitude: 37.787672,
        longitude: -122.396729
      };
      // Obtain the default map types from the platform object
      const maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      const map = new window.H.Map(
        document.getElementById('mapContainer'),
        maptypes.normal.map, {
          zoom: 12,
          center: {
            lng: longitude,
            lat: latitude
          }
        });
    });
  }

  render = () => {
    return <div style={this.style} id="mapContainer">
      {
        this.state.loading &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
        </div>
      }
    </div>
  }
}

export default HereMap;