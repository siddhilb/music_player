const play_button = document.getElementById("play");
let play_count = 0;
let is_playing = false;
let queue = 1;
let audio = document.getElementById("myaudio");
audio.src = `song_${queue}.mp3`;
let progress = document.getElementById("progress-bar");
console.log(audio);
let percentage;
let clicked = false;
const play_img = document.getElementById("playimg");
let played_once = false;
let maxqueue = 2;
function audioplaying(audio) {
  return !audio.paused;
}

audio.addEventListener("ended", function () {
    if (queue<=maxqueue){
        next();}
    else {
    play_img.src="pause2.png"
    audio.pause();}
});



audio.addEventListener("timeupdate", function (event) {
  percentage = (audio.currentTime / audio.duration) * 100;
  progress.max = 100;
  progress.value = percentage;

  //   if (!clicked) {
  //     progress.value = percentage;
  //   }
});

progress.addEventListener("mousedown", function (e) {
  //clicked=true;
  if (!audioplaying(audio)) {
    audio.play();
    play_img.src = "pause2.png";
  }
  console.log("clicked");
  audio.currentTime = (audio.currentTime * audio.duration) / 100;
  let x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)
    y = e.pageY - this.offsetTop, // or e.offsetY
    clickedValue = (x * this.max) / this.offsetWidth;

  //   progress.value=clickedValue
  //   audio.currentTime = clickedValue;
  //   percentage = (audio.currentTime / audio.duration) *100;
  //   progress.value = percentage * 2;
  audio.currentTime = (e.offsetX / progress.clientWidth) * audio.duration;
});

function next() {
  queue += 1;
  if (queue <= 2) {
    audio.src = `song_${queue}.mp3`;
    audio.load();
    // document.getElementById("list").textContent = `Currently playing: Song ${queue} of 2`;
    play_img.src = "pause2.png";
    if (audioplaying(audio)) {
      audio.pause();
    } else {
      audio.play();
    }
  } else {
    Toastify({
        text: "No more songs available after this one.",
        className: "toast",
        duration: 3000,
    }).showToast();
    queue -= 1;
    //     console.log(queue);
    //     queue-=1;
    //     audio.src = `song_${queue}.mp3`;
    //     audio.load();
    //     // document.getElementById("list").textContent = `Currently playing: Song ${queue} of 2`;
    //     play_img.src="pause2.png"
    //     if (audioplaying(audio)){
    //         audio.pause()
    //     }
    //     else{
    //         audio.play();
    //     }
  }
}

function back() {
  queue -= 1;
  if (queue >= 1) {
    audio.src = `song_${queue}.mp3`;
    audio.load();
    //   document.getElementById("list").textContent = `Currently playing: Song ${queue} of 2`;

    if (document.getElementById("playimg").src === "pause2.png") {
      audio.play();
    }

    if (!audioplaying(audio)) {
      play_img.src = "pause2.png";
      audio.play();
    }
  }
  else {
    Toastify({
      text: "No more songs available before this one.",
      className: "toast",
      duration: 3000,
    }).showToast();

    play_img.src = "play2.png";
    queue += 1;
  }

  if (audioplaying(audio)) {
    play_img.src = "pause2.png";
  } 
}

function play() {
  // played_once = true
  if (audioplaying(audio) || play_img.src === "pause2.png") {
    audio.pause();
    play_img.src = "play2.png";
  } else {
    audio.play();
    play_img.src = "pause2.png";
  }

  if (play_img.src === "pause2.png") {
    play_img.src = "play2.png";
  }
  if (play_img.src === "play2.png") {
    play_img.src = "pause2.png";
  }
}
