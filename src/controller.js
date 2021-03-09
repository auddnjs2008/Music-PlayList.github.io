"use strict";

import { player } from "./player.js";

export default class Controller {
  constructor() {
    this.controlWrapper = document.querySelector(".player");
    this.playWindow = document.querySelector(".player__window");
    this.playBtn = document.querySelector(".play");
    this.nextSong = document.querySelector(".forward");
    this.previousSong = document.querySelector(".backward");
    this.randomSong = document.querySelector(".random");
    this.playerBox = document.querySelector("#player");
    this.listUl = document.querySelector(".playlist__window");
    this.player = null;
    this.isPlaying = 0;
    this.indexSong = null;
  }

  handleControlClick(e) {
    const {
      target: { className },
    } = e;
    if (className.includes("play")) {
      this.playBtn.innerHTML = "<i class='fas fa-pause'></i>";

      player.playVideo();
      this.isPlaying = 1;
    } else if (className.includes("pause")) {
      this.playBtn.innerHTML = "<i class='fas fa-play-circle'></i>";
      player.pauseVideo();
      this.isPlaying = 0;
    } else if (className.includes("forward")) {
      player.nextVideo();
      if (!this.isPlaying) {
        this.playBtn.innerHTML = "<i class='fas fa-pause'></i>";
      }
    } else if (className.includes("backward")) {
      player.previousVideo();
      if (!this.isPlaying) {
        this.playBtn.innerHTML = "<i class='fas fa-pause'></i>";
      }
    } else if (className.includes("random")) {
      if (e.target.style.color === "red") {
        //랜덤 활성화
        player.setShuffle(true);
      } else {
        player.setShuffle(false);
      }
    }
  }

  getSongTitle(e) {
    if (e.data === 3) {
      player.seekTo(0);
      this.indexSong = e.target.getPlaylistIndex();
      const list = JSON.parse(localStorage.getItem("playlist"));
      this.playWindow.innerText = list[e.target.getPlaylistIndex()].title;
    }
  }

  init() {
    this.controlWrapper.addEventListener("click", (e) =>
      this.handleControlClick(e)
    );
    player.addEventListener("onStateChange", (e) => this.getSongTitle(e));
  }
}
