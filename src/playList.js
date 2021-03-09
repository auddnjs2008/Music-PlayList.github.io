"use strict";

import Controller from "./controller.js";
import { player, playListSet } from "./player.js";

const API_KEY = "AIzaSyCkbhnfqqwsgPmYRay89aEkQgMkd51Oy-M";

export default class PlayList {
  constructor() {
    this.listUl = document.querySelector(".playList__window");
    this.searchUl = document.querySelector(".search__window");
    this.playVideo = document.querySelector("#player");
    this.myController = new Controller();
  }

  makeList(song, index) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
    btn.innerHTML = '<i class="fas fa-minus-circle"></i>';
    span.innerText = song.title;
    li.id = song.id;
    li.setAttribute("data-index", index);
    li.className = "playList__item";
    li.appendChild(span);
    li.appendChild(btn);
    this.listUl.appendChild(li);
  }

  drawList(e) {
    const id = e.target.id;
    const title = e.target.dataset.title;
    const newList = { id, title };
    const index = localStorage.getItem("playlist")
      ? JSON.parse(localStorage.getItem("playlist")).length
      : 1;
    this.makeList(newList, index);
  }

  deleteList(node) {
    const id = node.id;
    const fixedList = JSON.parse(localStorage.getItem("playlist")).filter(
      (song) => song.id !== id
    );
    //this.listUl.removeChild(node);
    localStorage.setItem("playlist", JSON.stringify(fixedList));
    this.listUl.innerHTML = "";
    fixedList.forEach((song, index) => this.makeList(song, index + 1));
    playListSet();
  }

  playListPlay(node) {
    const {
      dataset: { index },
    } = node;

    const originList = JSON.parse(localStorage.getItem("playlist")).map(
      (item) => item.id
    );
    player.loadPlaylist({
      playlist: originList,
      listType: "playlist",
      index: 0,
      startSeconds: 0,
    });

    setTimeout(() => {
      player.playVideoAt(parseInt(index) - 1);
      player.setLoop(true);
    }, 300);
  }

  listInClick(e) {
    const {
      target: { tagName },
    } = e;
    if (tagName === "BUTTON") {
      this.deleteList(e.target.parentNode);
    } else if (tagName === "I") {
      this.deleteList(e.target.parentNode.parentNode);
    } else if (tagName === "SPAN") {
      this.playListPlay(e.target.parentNode);
      this.myController.playBtn.innerHTML = "<i class='fas fa-pause'></i>";
    }
  }

  init() {
    if (localStorage.getItem("playlist")) {
      JSON.parse(localStorage.getItem("playlist")).forEach((song, index) =>
        this.makeList(song, index + 1)
      );
    }

    this.searchUl.addEventListener("click", (e) => this.drawList(e));
    this.listUl.addEventListener("click", (e) => this.listInClick(e));
    this.myController.init();
  }
}
