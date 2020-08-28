import React, { Component } from "react";
import "video.js/dist/video-js.css";
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import "videojs-record/dist/css/videojs.record.css";
import videojs from "video.js";
import RecordRTC from "recordrtc";
import "webrtc-adapter";

import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
import Record from "videojs-record/dist/videojs.record.js";

import MyAudioUploader from "../audios/MyAudioUploader";
import { connect } from "react-redux";
import { NEXT_QUESTION } from "../../redux/actions/action_types";

export class AudioRecorder extends Component {
  state = {
    audioRecorded: false,
    audioHandled: false,
    audio: null,
  };

  componentDidMount() {
    this.player = videojs(this.audioNode, this.props, function() {
      var version_info =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        ", videojs-wavesurfer " +
        videojs.getPluginVersion("wavesurfer") +
        ", wavesurfer.js " + WaveSurfer.VERSION +
        " and recordrtc " + RecordRTC.version;
      videojs.log(version_info);
    });

    this.player.on("deviceReady", () => {
      console.log("device is ready!");
      this.player.record().start();
    });

    this.player.on('startRecord', function() {
        console.log('started recording!');
        console.log(this.props.isTesting);
        if (!this.props.isTesting) {
          this.props.startRecording();
        }
    });

    this.player.on('finishRecord', function() {
        console.log('finished recording: ', this.player.recordedData);
        if (!this.props.isTesting) {
          this.recordFinished();
        }
        this.player.bigPlayButton.show();
    });

     this.player.on('deviceError', function() {
        console.log('device error:', this.player.deviceErrorCode);
    });

    this.player.on('error', function(element, error) {
        console.error(error);
    });

    // auto start recording, but doesn't work here
//    this.player.record().getDevice();
  }

  componentWillUnmount() {
    this.disposePlayer();
  }

  disposePlayer = () => {
    if (this.player) {
      this.player.dispose();
    }
  }

  recordFinished = () => {
    this.props.recordingDone();
    this.setState({
      ...this.state,
      audio: this.player.recordedData,
      audioHandled: false,
      audioRecorded: true,
    });
  };

 resetDeviceAndNextQuestion = () => {
    this.resetDevice();
    this.props.onNextQuestion();
    this.props.resetCountdownBar();
  };

  resetDevice = () => {
    this.setState({
      ...this.state,
      audioRecorded: false,
      audioHandled: true,
    });
    this.player.record().reset();
  };

//  startMic = () => {
//    this.player.record().getDevice();
//  };

  render() {
    return (
      <div className="video-recorder-row">
        <div className="col-8">
          <div data-vjs-player>
            <audio
              id="myAudio"
              ref={(node) => (this.audioNode = node)}
              className="video-js vjs-default-skin"
            ></audio>
          </div>
        </div>
        <div className="col-3">
          {!this.props.isTesting &&
          this.state.audioRecorded &&
          !this.state.audioHandled ? (
            <MyAudioUploader
              resetDeviceAndNextQuestion={this.resetDeviceAndNextQuestion}
              resetDevice={this.resetDevice}
//              startMic={this.startMic}
              disposePlayer={this.disposePlayer}
              audio={this.state.audio}
              last_q={this.props.last_q}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNextQuestion: () => {
      dispatch({ type: NEXT_QUESTION });
    },
  };
};

export default connect(null, mapDispatchToProps)(AudioRecorder);
