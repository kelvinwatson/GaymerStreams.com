

import React from 'react';
import './App.css';

/*
 * Views
 */
import AppHeader from './Components/AppHeader';
import GamesListContainer from './Components/Containers/GamesListContainer';
import LiveStreamsContainer from './Components/Containers/LiveStreamsContainer';
import GaymersContainer from './Components/Containers/GaymersContainer';
import AppFooter from './Components/AppFooter';


const App = () => (
  <div className="App">

    <AppHeader></AppHeader>

    <GamesListContainer/>

    <LiveStreamsContainer/>

    <GaymersContainer/>

    <AppFooter/>
  </div>
)

// class App extends Component {
//   constructor(){
//     super();
//     this.onAddGaymerFormSubmit = this.onAddGaymerFormSubmit.bind(this);
//   }
//
//   componentDidMount(){
//     this.store = createStore(
//       GaymerBearsAppReducer,
//       applyMiddleware(
//         thunkMiddleware, // lets us dispatch() functions
//         createLogger() // neat middleware that logs actions
//       )
//     );
//
//     // FIXME: Remove below in production
//     this.unsubscribe = this.store.subscribe(() =>
//       DebugLog('logging state', this.store.getState()) //Every time the state changes, log it
//     );
//
//     this.store.dispatch(initializeFirebase());
//   }
//
//   componentWillUnmount(){
//     this.unsubscribe();
//   }
//
//   onAddGaymerFormSubmit(formData){
//     DebugLog('onAddGaymerFormSubmit',formData);
//     var store = this.store;
//     // this.store.dispatch(addGaymer(formData.gaymerName, formData.streamPlatform || 'Twitch'));
//
//     if (formData.streamPlatform === 'Twitch'){
//       store.dispatch(fetchTwitchIdFromName(formData.gaymerName, formData.streamPlatform || 'Twitch'))
//         .then(()=>DebugLog(store.getState()));
//     }
//   }
//
//   render() {
//
//
//     return (
//       <div className="App">
//
//         <AppHeader></AppHeader>
//
//         <AddGaymerForm onAddGaymerFormSubmit={this.onAddGaymerFormSubmit}/>
//
//         <GamesList/>
//
//         <Gaymers/>
//       </div>
//     );
//   }
// }

export default App;
