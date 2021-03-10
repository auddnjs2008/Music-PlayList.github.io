"use strict";

export default class Menu {
  constructor() {
    this.controller = document.querySelector(".player");
    this.songIcons = this.controller.querySelectorAll(".song");
    this.menuBtn = document.querySelector(".menu__bars");
    this.searchBtn = document.querySelector(".menu__search");
    this.playListBtn = document.querySelector(".menu__playlist");
    this.searchBox = document.querySelector(".search");
    this.playListBox = document.querySelector(".playList");
    this.menu = 0;
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
    console.log("music");
  }

  onShowSearch(e) {
    console.log("search");
  }

  init() {
    this.menuBtn.addEventListener("click", (e) => this.handleMenuClick(e));
    this.playListBtn.addEventListener("click", (e) => this.onShowMusicList(e));
    this.searchBtn.addEventListener("click", (e) => this.onShowSearch(e));
  }
}
