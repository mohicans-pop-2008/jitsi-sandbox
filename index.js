JitsiMeetJS.init(); // how do we know this ran?

// var config = {
//   hosts: {
//     domain: 'meet.jit.si',
//     muc: 'conference.' + 'meet.jit.si', // FIXME: use XEP-0030
//     focus: 'focus.meet.jit.si',
//   },
//   useNicks: false,
// };

console.log('connectionConfig', config)
// appId=null, token=null, options
// setting a serviceUrl on our config and specifying the use of wss instead
// of bosh seems to make all the red stuff go away
config.serviceUrl = config.websocket || config.bosh
const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);

// provide a way for us to know if a connection is established,
// failed to connect or disconnected
const onConnectionSuccess = () => {
  console.log('Connection Established!');
};

connection.addEventListener(
  JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
  onConnectionSuccess
);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();

const app = document.getElementById('app');
console.log('We got the app div -->', app);
