"use strict";
import { player } from "./player.js";

export default class Menu {
  constructor() {
    this.controller = document.querySelector(".player");
    this.songIcons = this.controller.querySelectorAll(".song");
    this.menuBtn = document.querySelector(".menu__bars");
    this.searchBtn = document.querySelector(".menu__search");
    this.playListBtn = document.querySelector(".menu__playlist");

    this.searchBox = document.querySelector(".search");
    this.playListBox = document.querySelector(".playList");
    this.playBox = document.querySelector("#player");

    this.prevSongIndex;
    this.songIndex = 0;
    this.menu = 0;
    this.songList = 0;
    this.search = 0;
  }

  playBoxDisplay(sw) {
    if (sw === 0) {
      // 끈다는의미
      this.playBox.style.display = "none";
    } else {
      //킨다는 의미
      this.playBox.style.display = "block";
    }
  }

  searchBoxDisplay(sw) {
    if (sw === 0) {
      this.searchBox.style.display = "none";
    } else {
      this.searchBox.style.display = "block";
    }
  }

  playListBoxDisplay(sw) {
    if (sw === 0) {
      this.playListBox.style.display = "none";
    } else {
      this.playListBox.style.display = "block";
    }
  }

  menuBarClick() {
    this.songIcons.forEach((item) => (item.style.display = "none"));
    this.searchBtn.style.display = "block";
    this.playListBtn.style.display = "block";
  }

  songControlClick() {
    this.songIcons.forEach((item) => (item.style.display = "block"));
    this.searchBtn.style.display = "none";
    this.playListBtn.style.display = "none";
  }

  handleMenuClick(e) {
    if (this.menu === 0) {
      this.menuBtn.innerHTML = '<i class="fas fa-music"></i>';
      this.menu = 1;
      this.menuBarClick();
    } else {
      this.menuBtn.innerHTML = '<i class="fas fa-bars">';
      this.menu = 0;
      this.songControlClick();
    }
  }

  onShowMusicList(e) {
    if (this.songList === 0) {
      this.playListBtn.style.color = "#81c147";
      this.songList = 1;
      this.playBoxDisplay(0);
      this.searchBoxDisplay(0);
      this.playListBoxDisplay(1);
    } else {
      this.songList = 0;
      this.playListBtn.style.color = "#fcded8";
      this.playBoxDisplay(1);
      this.playListBoxDisplay(0);
    }
    this.searchBtn.style.color = "#fcded8";
    this.search = 0;
  }

  onShowSearch(e) {
    if (this.search === 0) {
      this.searchBtn.style.color = "#81c147";
      this.search = 1;
      this.playBoxDisplay(0);
      this.playListBoxDisplay(0);
      this.searchBoxDisplay(1);
      // 리스트 색깔을 칠해줘야 한다.
    } else {
      this.searchBtn.style.color = "#fcded8";
      this.search = 0;
      this.playBoxDisplay(1);
      this.searchBoxDisplay(0);
    }
    this.playListBtn.style.color = "#fcded8";
    this.songList = 0;
  }

  listColor(e) {
    if (e.data === 3) {
      this.prevSongIndex = this.songIndex;
      const id = player.getPlaylist()[e.target.getPlaylistIndex()];
      const list = JSON.parse(localStorage.getItem("playlist"));
      this.songIndex = list.findIndex((item) => item.id === id);

      if (this.playListBox) {
        const listes = this.playListBox.querySelectorAll("li");
        listes[this.songIndex].style.backgroundColor = "#f6bdb3";
        listes[this.songIndex].style.color = "black";
        // 스크롤 조절
        listes[this.songIndex].scrollIntoView({ block: "center" });

        if (this.prevSongIndex !== this.songIndex) {
          listes[this.prevSongIndex].style.backgroundColor = "unset";
          listes[this.prevSongIndex].style.color = "#fcded8";
        }
      }
    }
  }

  init() {
    this.menuBtn.addEventListener("click", (e) => this.handleMenuClick(e));
    this.playListBtn.addEventListener("click", (e) => this.onShowMusicList(e));
    this.searchBtn.addEventListener("click", (e) => this.onShowSearch(e));
    player.addEventListener("onStateChange", (e) => this.listColor(e));
  }
}
