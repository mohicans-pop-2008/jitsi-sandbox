/* global config */

/* INITIALIZE */
// what? I don't know!
JitsiMeetJS.init(); // how do we know this ran?

/* CONFIG */
// what? no clue!
// well... serviceUrl is important. See https://meet.jit.si/config.js
// for a full config object.

//   - setting a serviceUrl on our config and specifying 
//   the use of wss instead of bosh seems to make 
//   all the red stuff go away
config.serviceUrl = config.websocket || config.bosh

/* ESTABLISH CONNECTION */
// JitsiConnection(appId=null, token=undefined, options)
const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);

// provide a way for us to know if a connection is established,
// failed to connect or disconnected
const onConnectionSuccess = () => {
  console.log(`==========Connection Established!\n
  Go you==========
    `);

  // initJitsiConference(name, options={})
  // REQUIRED: name
  const room = connection.initJitsiConference('name', {});
  room.join();
};

/* CONNECTION EVENT HANDLERS */

connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
  onConnectionSuccess
);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();

const app = document.getElementById('app');
console.log('We got the app div -->', app);
