/* global config */
async function jitsiInit() {
  /* INITIALIZE */
  // what? I don't know!
  JitsiMeetJS.init(); // how do we know this ran?

  /* CONFIG */
  // what? no clue!
  // well... serviceUrl is important. See https://meet.jit.si/config.js
  // for a full config object.
  console.log("connectionConfig", config);
  // appId=null, token=null, options
  // setting a serviceUrl on our config and specifying the use of wss instead
  // of bosh seems to make all the red stuff go away
  config.serviceUrl = config.websocket || config.bosh;

  /* CONNECTION EVENT HANDLERS */
  // provide a way for us to know if a connection is established,
  // failed to connect or disconnected
  let conference;
  const onConnectionSuccess = () => {
    console.log("Connection Established!");
    conference = connection.initJitsiConference("some-default-room", {});
    console.log("LET'S HAVE A LOOK AT THE CONFERENCE", conference)
    conference.on(
      JitsiMeetJS.events.conference.CONFERENCE_JOINED,
      onConferenceJoined
    );
    conference.join();
  };

  const onConnectionFailed = () => {
    console.log("Connection Failed!");
  };

  // connection.addEventListener(JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED, disconnect);

  /* CONFERENCE EVENT HANDLERS */
  const onConferenceJoined = async () => {
    console.log("onConferenceJoined ==========Conference Joined!==========");
    const localTracks = await JitsiMeetJS.createLocalTracks({ devices: ['video'], facingMode: 'user' }, true)
    await conference.addTrack(localTracks[0])
    videoTracks.push(localTracks[0])
    const app = document.getElementById("app");
    const myVideo = document.createElement("video")
    myVideo.width=250
    myVideo.autoplay='1'
    localTracks[0].attach(myVideo)
    app.appendChild(myVideo)
  };

  /* ESTABLISH CONNECTION */
  // JitsiConnection(appId=null, token=undefined, options)
  const connection = new JitsiMeetJS.JitsiConnection(null, undefined, config);

  // REGISTER EVENT HANDLERS
  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
    onConnectionSuccess
  );

  connection.addEventListener(
    JitsiMeetJS.events.connection.CONNECTION_FAILED,
    onConnectionFailed
  );

  await connection.connect(); // CONNECT!!!!

}

const videoTracks = []
jitsiInit();
/* DEBUG helpers */
