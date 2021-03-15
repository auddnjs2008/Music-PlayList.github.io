"use strict";

import Background from "./background.js";
import Login from "./login.js";
import Menu from "./menu.js";
import PlayList from "./playList.js";
import Search from "./search.js";

const login = new Login();
const search = new Search();
const myList = new PlayList();
const myMenuBar = new Menu();
const myBackground = new Background();

const setting = () => {
  login.init();
  search.init();
  myList.init();
  myMenuBar.init();
  myBackground.init();
};

setting();
