import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { FirebaseDatabaseNode } from '@react-firebase/database';
import YouTube from 'react-youtube';

const YoutubeScreen = (props) => {
  const [player, setPlayer] = useState(null);
  const [paused, setPaused] = useState(false);
  const [skipFunction, setSkipFunction] = useState('none');
  const onReady = (event) => {
    // eslint-disable-next-line
    setPlayer(event.target);
    console.log(event.target);
  };

  const onPlayVideo = () => {
    player.playVideo();
  };

  const onPauseVideo = () => {
    player.pauseVideo();
  };

  if (player != null) {
    paused ? onPauseVideo() : onPlayVideo();
    skipFunction == 'skip'
      ? player.seekTo(player.getCurrentTime() + 10)
      : skipFunction == 'rewind'
      ? player.seekTo(player.getCurrentTime() - 10)
      : null;
  }

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <FirebaseDatabaseNode path="navi/" limitToFirst={3}>
        {(d) => {
          return (
            <div>
              {d.value == null
                ? null
                : d.value.naviPage == 'Home'
                ? props.history.goBack()
                : null}
            </div>
          );
        }}
      </FirebaseDatabaseNode>

      <FirebaseDatabaseNode path="youtubeContent/" limitToFirst={4}>
        {(d) => {
          d.value == null ? null : setPaused(d.value.paused);
          d.value == null
            ? null
            : setSkipFunction(d.value.skipFunction);
          const opts = {
            width: '100%',
            height: '100%',
            backgroundColor: 'red',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
          // console.log(d.value);
          return d.value == null ? (
            <p>Loading Video...</p>
          ) : (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100%',
                pointerEvents: 'none',
              }}
            >
              <YouTube
                videoId={d.value.url.slice(-11)}
                onReady={onReady}
                opts={opts}
              />
            </div>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
};

export default YoutubeScreen;
