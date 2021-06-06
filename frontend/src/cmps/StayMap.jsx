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
            <div className="map">
                <h1>Location</h1>
                <Map
                    google={this.props.google}
                    zoom={10}
                    center={pos}
                    style={{
                         width: '1240px',
                        height: '550px',
                    //     margin: '0 auto',

                    }}
                //    containerStyle={{
                    // width: '1280px',
                    // height: '500px',
                    // margin:'100px',
                    // padding: '50px 0'
                //    }}
                >
                    <Marker
                        position={pos}
                        name={'stay location'} />
                </Map>
                <div>

                {/* <h1>{pos.address}</h1> */}
                </div>
            </div>
        )
    }
}

export const StayMap = GoogleApiWrapper({
    apiKey: (`AIzaSyBnQ0ebntiaqnKC_liI8ybwWzqTD68V02w`)
})(_GoogleMap)