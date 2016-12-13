/*global Recorder*/
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = window.AudioContext && new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var analyserNode

function initAudio() {
  if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  return new Promise(function (resolve, reject) {
    if (audioRecorder) return resolve()
    navigator.getUserMedia({
      "audio": {
      "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false"
      },
      "optional": []
      },
    }, function (stream) {
      inputPoint = audioContext.createGain();
      // Create an AudioNode from the stream.
      realAudioInput = audioContext.createMediaStreamSource(stream);
      audioInput = realAudioInput;
      audioInput.connect(inputPoint);
      // audioInput = convertToMono( input );
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 2048;
      inputPoint.connect( analyserNode );

      audioRecorder = new Recorder( inputPoint );

      var zeroGain = audioContext.createGain();
      zeroGain.gain.value = 0.0;
      inputPoint.connect( zeroGain );
      zeroGain.connect( audioContext.destination );
      resolve()
    }, function(e) {
      reject(e)
    })
  })
}

function emptyFn() { }

let recording = false

export default {
  startRecord: function (o) {
    let fail = o.fail || emptyFn
    if (!window.AudioContext) {
      fail(new Error('No audio API detected'))
      return Promise.reject()
    }
    return initAudio().then(() => {
      this.success = o.success
      this.stopRecord().then(() => {
        recording = true
        audioRecorder.clear();
        audioRecorder.record();
      })
      setTimeout(() => {
        this.stopRecord()
      }, 60000)
    }, fail)
  },
  stopRecord: function () {
    if (!recording) return Promise.resolve(null)
    recording = false
    audioRecorder.stop()
    return new Promise(resolve => {
      audioRecorder.exportWAV(blob => {
        var url = (window.URL || window.webkitURL).createObjectURL(blob)
        if (this.success) this.success(url)
        resolve(url)
      })
    })
  }
}
