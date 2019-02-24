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
import axios from 'axios';
import {
  fetchAnimals
} from '../AnimalAPI';

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

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    this.setState({
      loading: false
    })

    const {
      latitude,
      longitude
    } = {
      latitude: 37.787672,
      longitude: -122.396729
    };


    // var icon = new window.H.map.Icon('pokemon.png');
    // Create an icon object, an object with geographic coordinates and a marker:
    var icon = new window.H.map.Icon(
        'http://localhost:3000/pokemon.png'),
      coords = {
        lat: latitude,
        lng: longitude
      },
      marker = new window.H.map.Marker(coords, {
        icon: icon
      });



    // Obtain the default map types from the platform object
    const maptypes = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    const map = new window.H.Map(
      document.getElementById('mapContainer'),
      maptypes.normal.map, {
        zoom: 13,
        center: {
          lng: longitude,
          lat: latitude
        }
      });
    var ui = window.H.ui.UI.createDefault(map, maptypes, 'en-US');

    const res = await fetchAnimals(latitude, latitude);
    res.data.forEach((posting) => {
      if (!posting.classification) return;
      const bubble = new window.H.ui.InfoBubble({
        lat: posting.latitude,
        lng: posting.longitude
      }, {
        content: posting.classification
      });
      ui.addBubble(bubble);
    });
    map.setCenter(coords);
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