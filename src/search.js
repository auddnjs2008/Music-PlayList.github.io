"use strict";

import { playListSet } from "./player.js";

const API_KEY = "AIzaSyCkbhnfqqwsgPmYRay89aEkQgMkd51Oy-M";

export default class Search {
  constructor() {
    this.searchForm = document.querySelector(".search__form");
    this.titleInput = this.searchForm.querySelector("input");
    this.searchUl = document.querySelector(".search__window");
    this.sliderLeft = document.querySelector(".fa-caret-left");
    this.sliderRight = document.querySelector(".fa-caret-right");
  }

  showSearchList(videos) {
    videos.forEach((item) => {
      const li = document.createElement("li");
      const iframe = document.createElement("iframe");
      const button = document.createElement("button");
      iframe.src = `https://www.youtube.com/embed/${item.id.videoId}`;
      iframe.width = 330;
      iframe.height = 189;
      button.id = item.id.videoId;
      button.setAttribute("data-title", item.snippet.title);
      button.className = "search__btn";
      button.innerHTML = `<i id=${item.id.videoId} data-title='${item.snippet.title}' class='fas fa-plus'></i>`;

      li.appendChild(iframe);
      li.appendChild(button);
      this.searchUl.append(li);
    });
  }
  search(title) {
    const result = fetch(
      encodeURI(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${title}&part=snippet`
      )
    )
      .then((result) => result.json())
      .then((videos) => {
        console.log(videos);
        this.showSearchList(videos.items);
      });
  }
  onSubmit(e) {
    e.preventDefault();
    this.searchUl.innerHTML = "";
    const title = this.titleInput.value;
    this.titleInput.value = "";
    //검색을 해줘야 한다.
    this.search(title);
  }

  leftClick(scrollWidth, clientWidth, scrollLeft) {
    if (scrollLeft <= 0) {
      this.searchUl.style.scrollBehavior = "unset";
      this.searchUl.scrollLeft = scrollWidth - clientWidth;
    } else {
      this.searchUl.style.scrollBehavior = "smooth";
      this.searchUl.scrollLeft -= clientWidth;
    }
  }
  rightClick(scrollWidth, clientWidth, scrollLeft) {
    if (scrollLeft >= scrollWidth - clientWidth) {
      this.searchUl.style.scrollBehavior = "unset";
      this.searchUl.scrollLeft = 0;
    } else {
      this.searchUl.style.scrollBehavior = "smooth";
      this.searchUl.scrollLeft += clientWidth;
    }
  }

  onSliderClick(e) {
    const {
      target: { className },
    } = e;
    const {
      searchUl: { scrollWidth, clientWidth, scrollLeft },
    } = this;
    if (className.includes("right")) {
      this.rightClick(scrollWidth, clientWidth, scrollLeft);
    } else {
      this.leftClick(scrollWidth, clientWidth, scrollLeft);
    }
  }

  onaddBtnClick(e) {
    const {
      target: { id },
    } = e;
    const title = e.target.dataset.title;
    const originList = localStorage.getItem("playlist")
      ? JSON.parse(localStorage.getItem("playlist"))
      : [];
    //중복이면  추가를 해주지 않는다.
    if (originList.find((itemId) => itemId.id === id) === undefined) {
      localStorage.setItem(
        "playlist",
        JSON.stringify([...originList, { id, title }])
      );
      playListSet();
    }
  }

  init() {
    this.searchForm.addEventListener("submit", (e) => this.onSubmit(e));
    this.sliderLeft.addEventListener("click", (e) => this.onSliderClick(e));
    this.sliderRight.addEventListener("click", (e) => this.onSliderClick(e));
    this.searchUl.addEventListener("click", (e) => this.onaddBtnClick(e));
  }
}
