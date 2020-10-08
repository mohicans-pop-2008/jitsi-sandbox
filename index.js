JitsiMeetJS.init(); // how do we know this ran?

var config = {
  hosts: {
    domain: "jitsi.example.com",
    muc: "conference.jitsi.example.com", // FIXME: use XEP-0030
    bridge: "jitsi-videobridge.jitsi.example.com", // FIXME: use XEP-0030
  },
  useNicks: false,
  bosh: "//jitsi.example.com/http-bind", // FIXME: use xep-0156 for that
};

// appId=null, token=null, options
const connection = new JitsiMeetJS.JitsiConnection(
  null,
  null,
  config
);

// provide a way for us to know if a connection is established,
// failed to connect or disconnected
const onConnectionSuccess = () => {console.log('Connection Established!')}

connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED, onConnectionSuccess);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_FAILED, onConnectionFailed);
// connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

connection.connect();

const app = document.getElementById("app");
console.log("We got the app div -->", app);
