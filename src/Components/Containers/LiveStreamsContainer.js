import { connect } from 'react-redux';
import LiveStreams from '../LiveStreams';

const mapStateToProps = (state) => {
  return {
    status: state.twitchLiveStreamsList.status,
    liveStreams: state.twitchLiveStreamsList.liveStreams
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // onFormSubmit: (gaymerName, streamPlatform) => {
//     //   dispatch(fetchTwitchIdFromName(gaymerName, streamPlatform))
//     }
//   }
// }

const LiveStreamsContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(LiveStreams)

export default LiveStreamsContainer;
