import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as SQLite from 'expo-sqlite';

const Bpm = () => {

  const { width, height } = Dimensions.get('window');
  console.log(width, height);

  const videoUri = require('../../movie/test.mp4');
  const [videoRef, setVideoRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [start, setStart] = useState(0); // startをuseStateで管理
  const [videoStyle, setVideoStyle] = useState(styles.video);

  const startTimer = () => {
    const id = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 5000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const resumeTimer = () => {
    if (!intervalId) {
      startTimer();
    }
  };

  let bpmDemo = 70;

  const handlePlayPause = async () => {
    if (start === 0) {
      startTimer();
      if (videoRef) {
        if (videoRef.isPlaying) {
          await videoRef.pauseAsync();
        } else {
          await videoRef.playAsync();
        }
        console.log('開始');
        setVideoStyle({
          ...styles.video_2,
          width: height,
          height: width,
        });
        setStart(1); // startの値を更新
      }
    } else {
      resumeTimer();
      if (videoRef) {
        if (videoRef.isPlaying) {
          await videoRef.pauseAsync();
        } else {
          await videoRef.playAsync();
        }
        setVideoStyle({
          ...styles.video_2,
          width: height,
          height: width,
        });
        console.log('再開');
      }
    }
  };

  const handleStop = async () => {
    stopTimer();
    if (videoRef) {
      await videoRef.stopAsync();
      setVideoStyle(styles.video);
      console.log('一時停止');
    }
  };

  console.log(start);

  return (
    <View style={styles.container}>
      <Video
        ref={(ref) => setVideoRef(ref)}
        style={videoStyle}
        source={videoUri}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>
            {videoRef && videoRef.isPlaying ? '一時停止' : '再生'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStop} style={styles.controlButton}>
          <Text style={styles.controlButtonText}>停止</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  video: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 0,
    left: 0
  },
  video_2: {
    position: 'absolute',
    top: 0,
    left: 0,
    transform: [{ translateX: -218.5 }, { translateY: 218.5 }, { rotate: '90deg' }]
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  controlButtonText: {
    color: 'white',
  },
});

export default Bpm;
