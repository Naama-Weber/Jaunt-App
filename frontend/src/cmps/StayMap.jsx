import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Component } from 'react';
// import '../assets/css/pages/about-page.css'
class _GoogleMap extends Component {

    state = {
        pos: {
            adddress: null,
            lat: null,
            lng: null
        }
    }

    componentDidMount() {
        const pos = this.props.stay.loc
        this.setState({ pos })
    }

    render() {
        const { pos } = this.state
        return (
            <div className="map-container">
                <h1>Location</h1>
                <Map
                    google={this.props.google}
                    zoom={17}
                    center={pos}
                    style={{
                        maxWidth: "450px",
                        height: "350px",
                        overflowX: "hidden",
                        overflowY: "hidden"
                        //     margin: '0 auto',
                    }}
                    containerStyle={{
                        // width: '1280px',
                        // height: '500px',
                        // position: 'absolute',
                        width: '100%',
                        height: '100%',
                        position: 'absolute'
                    }}
                >
                    <Marker
                        position={pos}
                        name={'stay location'} />
                </Map>
            </div>
        )
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: (`AIzaSyBnQ0ebntiaqnKC_liI8ybwWzqTD68V02w`)
})(_GoogleMap)