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
    this.isShuffle = 0;
  }

  handleControlClick(e) {
    const {
      target: { className },
    } = e;

    if (className === "play song" || className === "fas fa-play-circle") {
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
      if (this.isShuffle === 0) {
        //랜덤 활성화
        player.setShuffle(true);

        this.randomSong.style.color = "#81c147";
        this.isShuffle = 1;
      } else {
        player.setShuffle(false);
        this.randomSong.style.color = "#fcded8";
        this.isShuffle = 0;
      }
    }
  }

  getSongTitle(e) {
    if (e.data === 3) {
      player.seekTo(0);
      const id = player.getPlaylist()[e.target.getPlaylistIndex()];
      const list = JSON.parse(localStorage.getItem("playlist"));
      this.indexSong = list.findIndex((item) => item.id === id);
      this.playWindow.innerText = list[this.indexSong].title;
      player.setLoop(true);
    }
  }

  init() {
    this.controlWrapper.addEventListener("click", (e) =>
      this.handleControlClick(e)
    );
    player.addEventListener("onStateChange", (e) => this.getSongTitle(e));
  }
}
