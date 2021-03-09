"use strict";

import Login from "./login.js";
import PlayList from "./playList.js";
import Search from "./search.js";

const login = new Login();
const search = new Search();
const myList = new PlayList();

const setting = () => {
  login.init();
  search.init();
  myList.init();
};

setting();
