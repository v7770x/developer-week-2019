import React from 'react';
import {
  Label,
  Grid,
  Header,
  Button,
  Image
} from 'semantic-ui-react'

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
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition((postion) => {
      const {
        latitude,
        longitude
      } = postion.coords || {
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
    </div>
  }
}

export default HereMap;