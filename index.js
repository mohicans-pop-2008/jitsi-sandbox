async function jitsiInit() {
  JitsiMeetJS.init(); // how do we know this ran?

  console.log('connectionConfig', config)
  // appId=null, token=null, options
  // setting a serviceUrl on our config and specifying the use of wss instead
  // of bosh seems to make all the red stuff go away
  config.serviceUrl = config.websocket || config.bosh

  const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);

  // provide a way for us to know if a connection is established,
  // failed to connect or disconnected
  let conference
  const onConnectionSuccess = () => {
    console.log('Connection Established!');
    conference = connection.initJitsiConference('some-default-room', {})
  };

  const onConnectionFailed = () => {
    console.log('Connection Failed!')
  }

  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess
  );

  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed
  );
  // connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

  await connection.connect();

  //ASYNCHRONOUS!
  // const localTracks = await JitsiMeetJS.createLocalTracks({ devices: ['video', 'audio'], facingMode: 'user' }, true)

  conference.on(JitsiMeetJs.events.conference.CONFERENCE_JOINED)
  conference.join()
}

jitsiInit()

const app = document.getElementById('app');
console.log('We got the app div -->', app);
