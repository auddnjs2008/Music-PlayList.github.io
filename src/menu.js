"use strict";
import { player } from "./player.js";

export default class Menu {
  constructor() {
    this.mp3 = document.querySelector(".mp3");

    this.controller = document.querySelector(".player");
    this.controlBtnPad = document.querySelector(".player__button");
    this.songIcons = this.controller.querySelectorAll(".song");
    this.menuBtn = document.querySelector(".menu__bars");
    this.searchBtn = document.querySelector(".menu__search");
    this.playListBtn = document.querySelector(".menu__playlist");
    this.colorBtn = document.querySelector(".menu__color");

    this.searchBox = document.querySelector(".search");
    this.playListBox = document.querySelector(".playList");
    this.playBox = document.querySelector("#player");
    this.colorBox = document.querySelector(".color");

    this.prevSongIndex;
    this.songIndex = 0;
    this.menu = 0;
    this.songList = 0;
    this.search = 0;
    this.colorSw = 0;
    this.mousedown = 0;
  }

  playBoxDisplay(sw) {
    if (sw === 0) {
      this.playBox.style.opacity = "0";
      this.playBox.style.zIndex = "-10";
    } else {
      this.playBox.style.opacity = "1";
      this.playBox.style.zIndex = "unset";
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

  colorBoxDisplay(sw) {
    if (sw === 0) {
      this.colorBox.style.display = "none";
    } else {
      this.colorBox.style.display = "block";
    }
  }

  menuBarClick() {
    this.songIcons.forEach((item) => (item.style.display = "none"));
    this.searchBtn.style.display = "block";
    this.playListBtn.style.display = "block";
    this.colorBtn.style.display = "block";
  }

  songControlClick() {
    this.songIcons.forEach((item) => (item.style.display = "block"));
    this.searchBtn.style.display = "none";
    this.playListBtn.style.display = "none";
    this.colorBtn.style.display = "none";
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
      this.colorBoxDisplay(0);
      this.playListBoxDisplay(1);
    } else {
      this.songList = 0;
      this.playListBtn.style.color = "#fcded8";
      this.playBoxDisplay(1);
      this.playListBoxDisplay(0);
    }
    this.searchBtn.style.color = "#fcded8";
    this.colorBtn.style.color = "#fcded8";
    this.search = 0;
    this.colorSw = 0;
  }

  onShowSearch(e) {
    if (this.search === 0) {
      this.searchBtn.style.color = "#81c147";
      this.search = 1;
      this.playBoxDisplay(0);
      this.playListBoxDisplay(0);
      this.colorBoxDisplay(0);
      this.searchBoxDisplay(1);
      // 리스트 색깔을 칠해줘야 한다.
    } else {
      this.searchBtn.style.color = "#fcded8";
      this.search = 0;
      this.playBoxDisplay(1);
      this.searchBoxDisplay(0);
    }
    this.playListBtn.style.color = "#fcded8";
    this.colorBtn.style.color = "#fcded8";
    this.colorSw = 0;
    this.songList = 0;
  }

  onShowColor(e) {
    if (this.colorSw === 0) {
      this.colorBtn.style.color = "#81c147";
      this.colorSw = 1;
      this.playBoxDisplay(0);
      this.playListBoxDisplay(0);
      this.searchBoxDisplay(0);
      this.colorBoxDisplay(1);
      this.setColorChange();
    } else {
      this.colorBtn.style.color = "#fcded8";
      this.colorSw = 0;
      this.clearColorChange();
      this.playBoxDisplay(1);
      this.colorBoxDisplay(0);
    }
    this.playListBtn.style.color = "#fcded8";
    this.searchBtn.style.color = "#fcded8";
    this.songList = 0;
    this.search = 0;
  }

  setColorChange() {
    const mainInputes = this.colorBox
      .querySelector(".color__main")
      .querySelectorAll("input");
    const controlInputes = this.colorBox
      .querySelector(".color__controller")
      .querySelectorAll("input");

    mainInputes.forEach((item) => {
      item.addEventListener("mousedown", () => (this.mousedown = 1));
      item.addEventListener("mouseup", () => (this.mousedown = 0));
      item.addEventListener("mousemove", (e) => this.onColorChange(e));
      item.addEventListener("change", (e) => this.onColorChange(e));
    });
    controlInputes.forEach((item) => {
      item.addEventListener("mousedown", () => (this.mousedown = 1));
      item.addEventListener("mouseup", () => (this.mousedown = 0));
      item.addEventListener("mousemove", (e) => this.onColorChange(e));
      item.addEventListener("change", (e) => this.onColorChange(e));
    });
  }
  clearColorChange() {
    const mainInputes = this.colorBox
      .querySelector(".color__main")
      .querySelectorAll("input");
    const controlInputes = this.colorBox
      .querySelector(".color__controller")
      .querySelectorAll("input");

    mainInputes.forEach((item) => {
      item.removeEventListener("mousedown", () => (this.mousedown = 1));
      item.removeEventListener("mouseup", () => (this.mousedown = 0));
      item.removeEventListener("mousemove", (e) => this.onColorChange(e));
      item.removeEventListener("change", (e) => this.onColorChange(e));
    });
    controlInputes.forEach((item) => {
      item.removeEventListener("mouseup", () => (this.mousedown = 1));
      item.removeEventListener("mouseover", () => (this.mousedown = 0));
      item.removeEventListener("mousemove", (e) => this.onColorChange(e));
      item.removeEventListener("change", (e) => this.onColorChange(e));
    });
  }

  onColorChange(e) {
    const mainInputes = this.colorBox
      .querySelector(".color__main")
      .querySelectorAll("input");
    const controlInputes = this.colorBox
      .querySelector(".color__controller")
      .querySelectorAll("input");
    const {
      target: { className, name },
    } = e;

    if (this.mousedown || e.type === "change") {
      if (className === "mainBoard") {
        this.mainColorChanger(mainInputes);
      } else if (className === "controller") {
        this.controlColorChanger(controlInputes);
      }
      const colors = {
        body: this.mp3.style.backgroundColor,
        controller: this.controlBtnPad.style.backgroundColor,
      };
      localStorage.setItem("colors", JSON.stringify(colors));
    }
  }

  mainColorChanger(values) {
    this.mp3.style.backgroundColor = `rgb(${values[0].value},${values[1].value},${values[2].value})`;
  }
  controlColorChanger(values) {
    this.controlBtnPad.style.backgroundColor = `rgb(${values[0].value},${values[1].value},${values[2].value})`;
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
    if (localStorage.getItem("colors")) {
      const colors = JSON.parse(localStorage.getItem("colors"));
      this.mp3.style.backgroundColor = colors.body;
      this.controlBtnPad.style.backgroundColor = colors.controller;
    }

    this.menuBtn.addEventListener("click", (e) => this.handleMenuClick(e));
    this.playListBtn.addEventListener("click", (e) => this.onShowMusicList(e));
    this.searchBtn.addEventListener("click", (e) => this.onShowSearch(e));
    this.colorBtn.addEventListener("click", (e) => this.onShowColor(e));
    player.addEventListener("onStateChange", (e) => this.listColor(e));
  }
}
