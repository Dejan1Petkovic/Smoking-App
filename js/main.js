let data = [];
if (localStorage.data) {
   data = JSON.parse(localStorage.data);
}else {
   data = [];
}

let newDayBtn = document.getElementsByClassName('myBtn')[0],
  statBtn = document.getElementById('statBtn'),
  homeBtn = document.getElementById('homeBtn'),
  circle = document.getElementsByClassName('circle')[0],
  timeSpan = document.getElementById('timeSpan'),
  totalSpan = document.getElementById('totalSpan'),
  dateSpan = document.getElementById('dateSpan'),
  lastTimeSpan = document.getElementById('lastTimeSpan'),
  message = document.getElementById('message'),
  mainPage = document.querySelector('#mainPage'),
  statPage = document.querySelector('#statPage'),
  logo = document.querySelector('#logo'),
  cover6 = document.getElementsByClassName('cover')[6],
  cover5 = document.getElementsByClassName('cover')[5],
  cover4 = document.getElementsByClassName('cover')[4],
  cover3 = document.getElementsByClassName('cover')[3],
  cover2 = document.getElementsByClassName('cover')[2],
  cover1 = document.getElementsByClassName('cover')[1],
  cover0 = document.getElementsByClassName('cover')[0],
  currentCigs,
  startTimeCig,
  totalCigs,
  noSmoke,
  loop;

setVars();

newDayBtn.addEventListener('click', resetDay);            //*************************************************
statBtn.addEventListener('click', displayStat);           //        EVENTS
homeBtn.addEventListener('click', displayHome);
circle.addEventListener('click', update);                 //***********************************************
logo.addEventListener('click', homePage);

function homePage(e) {
  e.preventDefault();
  displayHome();
}


//**** display Pages ***** //

function displayStat() {
  mainPage.style.display = "none";
  statPage.style.display = "block";
  statDisplayWeekly();

};

function displayHome() {
  mainPage.style.display = "block";
  statPage.style.display = "none";
};

function getDaylyNumbers() {
  let totalCigsDaily = localStorage.totalCigsDaily;
  let broj = totalCigsDaily * 4;
  data.push(broj);                                                      // function to get and save the info about how many cigs per day
  localStorage.setItem('data',data);                                    // user had, so we can manipulate later.

};

function statDisplayWeekly() {
  setTimeout(function functionName() {
    cover6.style.height = 160 - (data[data.length -1]) + 'px';
    cover5.style.height = 160 - (data[data.length -2]) + 'px';
    cover4.style.height = 160 - (data[data.length -3]) + 'px';          //this function showes lines in graficon of how many cigs we had
    cover3.style.height = 160 - (data[data.length -4]) + 'px';          //in last seven days
    cover2.style.height = 160 - (data[data.length -5]) + 'px';
    cover1.style.height = 160 - (data[data.length -6]) + 'px';
    cover0.style.height = 160 - (data[data.length -7]) + 'px';
    console.log(cover6.style.height);
    console.log(cover5.style.height);

  },500);
}

function saveData() {
  localStorage.data = JSON.stringify(data);
}
//**** END display Pages ***** //



// *** Main Page functions *** //
function update() {
  updateVars();

  if (currentCigs >= 1) {
    startCig();
  }

  if (totalCigs == 1) {
    setStartDate();
    currentTime();
  } else {
    clearInterval(loop);
    currentTime();
  }
  saveVars();
  updateView();
  fireEffect();
}

function resetDay() {
  localStorage.totalCigsDaily = currentCigs;
  getDaylyNumbers();
  localStorage.currentCigs = 0;
  localStorage.totalCigsDaily = 0;
  setVars();
  saveData();
  displayHome();
};

function updateView() {
  //***update Circle***
  circle.innerHTML = currentCigs;
  //***update Total Cigarettes***
  totalSpan.innerHTML = totalCigs;
  //***update Start Date***
  if (localStorage.startingDate) {
    dateSpan.innerHTML = localStorage.startingDate;
  };
};

function setVars() {
  cover6.style.height = 160  + 'px';
  cover5.style.height = 160  + 'px';
  cover4.style.height = 160  + 'px';
  cover3.style.height = 160  + 'px';
  cover2.style.height = 160  + 'px';
  cover1.style.height = 160  + 'px';
  cover0.style.height = 160  + 'px';
  (localStorage.currentCigs) ? currentCigs = localStorage.currentCigs: currentCigs = 0;
  (localStorage.totalCigs) ? totalCigs = localStorage.totalCigs: totalCigs = 0;
  if (localStorage.startTimeCig) {
    currentTime();
  };
  updateView();
};

function saveVars() {
  localStorage.currentCigs = currentCigs;
  localStorage.totalCigs = totalCigs;
};

function updateVars() {
  currentCigs++;
  totalCigs++;
};

function startCig() {
  startTimeCig = new Date().getTime();
  localStorage.startTimeCig = startTimeCig;
};

function setStartDate() {
  localStorage.startingDate = new Date().toDateString();
  dateSpan.innerHTML = localStorage.startingDate;
};

function currentTime() {
  noSmokeTime();                                                    //This function is to display time beatwin two cigs on the homePage
  loop = setInterval(function() {
    noSmokeTime();
  }, 1000)
};

function noSmokeTime() {
  let startTime = localStorage.startTimeCig
  let counter = Math.round((new Date().getTime() - startTime) / 1000);
  let sec0;
  let min0;
  let h0;
  if (counter < 60) {
    (counter < 10) ? noSmoke = '0' + counter + ' sec': noSmoke = counter + ' sec';
  } else if (counter >= 60 && counter < 3600) {
    let min = Math.floor(counter / 60);
    let sec = counter % (min * 60);
    (min < 10) ? min0 = '0' + min: min0 = min;
    (sec < 10) ? sec0 = '0' + sec: sec0 = sec;
    noSmoke = min0 + ' m : ' + sec0 + ' s';
  } else if (counter >= 3600) {
    let h = Math.floor(counter / 3600);
    min = Math.floor((counter % (h * 3600)) / 60);
    sec = counter % ((min * 60) + (h * 3600));
    (h < 10) ? h0 = '0' + h: h0 = h;
    (min < 10) ? min0 = '0' + min: min0 = min;
    (sec < 10) ? sec0 = '0' + sec: sec0 = sec;
    noSmoke = h0 + ' h : ' + min0 + ' m : ' + sec0 + ' s';
  };
  lastTimeSpan.innerHTML = noSmoke;
};

function fireEffect() {
  playSound();
  circle.style.backgroundSize = "600px";
  setTimeout(function() {
    circle.style.backgroundSize = "1px";
  }, 1700)
}

function playSound() {
  let smokeSound = document.createElement('audio');
  smokeSound.setAttribute('src', "sound/lighting-cigarette-sound.wav");
  smokeSound.play();
}

(function messageRnd() {
  let quitSmokingMsg = ["Keep Calm and Quit Smoking!", "Don't smoke, or die!", "Quit smoking today, save your family!", "Is the value of your life that cheep!"];
  let i = Math.floor(Math.random() * quitSmokingMsg.length);
  message.innerHTML = quitSmokingMsg[i];
}());

// *** Stat Page functions *** //
