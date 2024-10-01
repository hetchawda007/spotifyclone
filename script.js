let element8 = document.querySelector(".element-8");

async function foldername() {
    let foldername = []
    let x = await fetch('/songs');
    let response = await x.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let a = div.getElementsByTagName("a");
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        let ele = element.href
        if (element.href.includes(".htaccess")) { }
        else {
            if (ele.endsWith("/")) {
                foldername.push(ele.slice(ele.search("/songs") + 7, ele.lastIndexOf("/")));
            }
        }
    }
    foldername.splice(0, 1);
    return foldername;
}

async function getimage(foldersname) {
    let imagename = []
    for (const e of foldersname) {
        let api = '/songs/' + e + '/';
        let x = await fetch(api);
        let response = await x.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let a = div.getElementsByTagName("a");
        for (let index = 0; index < a.length; index++) {
            let element = a[index];
            let ele = element.href
            if (ele.endsWith("jpeg")) {
                imagename.push(ele.slice(ele.lastIndexOf("/") + 1));
            }
        }
    }
    return imagename;
}

async function insertfolder(foldersname, imagename) {
    for (let index = 0; index < foldersname.length; index++) {
        let picture = '/songs/' + foldersname[index] + '/' + imagename[index];
        element8.innerHTML += `<div class="btn-3">
                                <button class="btn-5" id="btn-${index + 1}">
                                    <img class="img-1" src="${picture}" alt="play-button">
                                    <h1>${foldersname[index]}</h1>
                                    <p>${foldersname[index]} songs for you</p>
                                </button>
                            </div>`;
    }
}

async function getsongs(foldersname) {
    let songs = {}
    for (const e of foldersname) {
        let songpath = []
        let api = '/songs/' + e + '/';
        let x = await fetch(api);
        let response = await x.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let a = div.getElementsByTagName("a");
        for (let index = 0; index < a.length; index++) {
            let element = a[index];
            let ele = element.href
            if (ele.endsWith("mp3")) {
                songpath.push(ele.slice(ele.lastIndexOf("/") + 1, ele.search(".mp3")));
            }
        }
        songs[e] = songpath;

    }
    return songs

}

async function getassets(song, imagename) {

    let element5 = document.querySelector(".element-5");
    let btn = document.querySelectorAll(".btn-5");
    btn.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.backgroundColor = "rgb(45, 45, 45)";
            element.insertAdjacentHTML('beforeend',
                `<div class="img-3">
                <img class="img-2" src="assets/play.png" alt="">
                </div>`);
        })
        element.addEventListener('mouseleave', () => {
            let img3 = document.querySelector(".img-3");
            let img2 = document.querySelector(".img-2");
            if (img2) img2.remove();
            if (img3) img3.remove();
            element.style.backgroundColor = "";
        });
    });

    let element9 = document.querySelector(".element-9");

    for (let k = 0; k <= 11; k++) {
        let playlist = document.getElementById("btn-" + (k + 1));
        playlist.addEventListener('click', () => {
            let i = 0;
            let currentSongIndex = 0;
            document.querySelectorAll(".audio-2").forEach((aud) => {
                aud.pause()
            });

            function library(audio) {
                let playlistsname = audio.slice(audio.search("/songs") + 7, audio.lastIndexOf("/"))
                let songname = audio.slice(audio.lastIndexOf("/") + 1, audio.search(".mp3"))

                if (element5.contains(document.querySelector('.cage'))) { }

                else {
                    element5.insertAdjacentHTML('beforeend', `<div class="cage">
                        <div class="cage-1">
                        <audio class="audio-2" src="${audio}" ></audio>
                        <img src="assets/music-symbol.png" alt="">
                        </div>
                        <div class="cage-2">
                        <p class="text-3">${songname}</p>
                        <p class="text-4">${playlistsname}</p>
                        </div>
                        <div class="cage-3">
                        <button class="btn-10">
                        Play Now
                        <img src="assets/play-button.png" title="this is a button" alt="">
                        </button>
                        </div>
                        </div> `)
                }

                function duplicatefinder() {
                    let songs = document.querySelectorAll('.text-3')

                    let audioname = []
                    songs.forEach(element => {
                        audioname.push(element.innerHTML);
                    });
                    for (let index = 0; index < audioname.length; index++) {
                        if (songname == audioname[index]) {
                            return 1
                        }
                    }
                }

                let a = duplicatefinder()
                if (a != 1) {
                    element5.insertAdjacentHTML('beforeend', `<div class="cage">
                        <div class="cage-1">
                        <audio class="audio-2" src="${audio}" ></audio>
                        <img src="assets/music-symbol.png" alt="">
                        </div>
                        <div class="cage-2">
                        <p class="text-3">${songname}</p>
                        <p class="text-4">${playlistsname}</p>
                        </div>
                        <div class="cage-3">
                        <button class="btn-10">
                        Play Now
                        <img src="assets/play-button.png" title="this is a button" alt="">
                        </button>
                        </div>
                        </div> `)
                }

                playsong();
            }


            for (const key in song) {
                if (i == k) {
                    let image_address = '/songs/' + key + '/' + imagename[i];
                    let playlist_name = key;
                    let song_name = song[key][currentSongIndex];

                    element9.innerHTML = `
                        <div class="inbox-1">
                            <audio class="audio-1" src="${'/songs/' + key + '/' + song[key][currentSongIndex] + '.mp3'}" ></audio>
                            <img class="img" src=${image_address} alt="this is an image">
                            <div class="title">
                                <p class="text-1">${song_name}</p>
                                <p class="text-2">${playlist_name}</p>
                            </div>
                        </div>

                        <div class="inbox-2">
                            <div class="btn-4">
                                <button id="left">
                                    <img src="/assets/play-left.png" alt="">
                                </button>
                                <button id="play">
                                    <img src="/assets/play-button.png" alt="">
                                </button>
                                <button id="right">
                                    <img src="/assets/play-right.png" alt="">
                                </button>
                            </div>
                            <div class="time">
                                <p id="start-time">00:00</p>
                                <input type="range" class="range-1" min="0" max="100" value="0">
                                <p id="end-time">00:00</p>
                            </div>
                        </div>

                        <div class="inbox-3">
                            <button>
                                <img src="/assets/volume.png" width="20px" alt="">
                            </button>
                            <input type="range" class="range-2" min="1" max="100" value="100">
                        </div>`;


                    let audio = document.querySelector(".audio-1");
                    let leftplay = document.getElementById("left");
                    let play = document.getElementById("play");
                    let rightplay = document.getElementById("right");
                    let starttime = document.getElementById("start-time");
                    let range1 = document.querySelector(".range-1");
                    let endtime = document.getElementById("end-time");
                    let range2 = document.querySelector(".range-2");

                    function updateSongDetails(index) {
                        audio.src = '/songs/' + key + '/' + song[key][index] + '.mp3';
                        let song_name = song[key][index];
                        document.querySelector(".text-1").textContent = song_name;
                        audio.load();
                        audio.play();
                        play.innerHTML = `<img src="/assets/pause.png" class="pause" alt="">`;
                        play.id = "pause";
                    }

                    rightplay.addEventListener('click', () => {
                        currentSongIndex = (currentSongIndex + 1) % song[key].length;
                        updateSongDetails(currentSongIndex);
                        library(audio.src);
                    });

                    leftplay.addEventListener('click', () => {
                        currentSongIndex = (currentSongIndex - 1 + song[key].length) % song[key].length;
                        updateSongDetails(currentSongIndex);
                        library(audio.src);
                    });

                    play.addEventListener('click', () => {
                        if (audio.paused) {
                            play.innerHTML = `<img src="/assets/pause.png" class="pause" alt="">`;
                            play.id = "pause";
                            library(audio.src);
                            audio.play();
                        } else {
                            let pause = document.getElementById("pause");
                            pause.innerHTML = `<img src="/assets/play-button.png" alt="">`;
                            pause.id = "play";
                            audio.pause();
                        }
                    });

                    function formatTime(seconds) {
                        const minutes = Math.floor(seconds / 60);
                        const secs = Math.floor(seconds % 60);
                        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
                    }

                    audio.addEventListener('loadedmetadata', () => {
                        range1.max = Math.floor(audio.duration);
                        endtime.textContent = formatTime(audio.duration);
                    });

                    audio.addEventListener('timeupdate', () => {
                        range1.value = Math.floor(audio.currentTime);
                        starttime.textContent = formatTime(audio.currentTime);
                    });

                    range1.addEventListener('input', () => {
                        audio.currentTime = range1.value;
                    });

                    range2.addEventListener('input', () => {
                        audio.volume = range2.value / 100;
                    });

                    element8.style.height = "75%";
                    element9.style.height = "12%";

                    break;
                }
                i += 1;
            }
        });
    }
}

async function playsong() {
    let btn = document.querySelectorAll('.btn-10');
    let element9 = document.querySelector(".element-9");
    btn.forEach(element => {
        element.addEventListener('click', () => {
            let ele = element.parentElement.previousSibling.previousSibling.children;
            let songname = ele[0].innerHTML;
            let playlistname = ele[1].innerHTML;
            let imageaddress = '/songs/' + playlistname + '/' + playlistname + '.jpeg';
            document.querySelectorAll(".audio-2").forEach((aud) => {
                aud.pause()
            });

            element9.innerHTML = `<div class="inbox-1">
                        <img class="img" src=${imageaddress} alt="this is an image">
                        <div class="title">
                        <p class="text-1">${songname}</p>
                        <p class="text-2">${playlistname}</p>
                        </div>
                        </div>
                        
                        <div class="inbox-2">
                        <div class="btn-4">
                        <button>
                        <img src="/assets/play-left.png" alt="">
                        </button>
                        <button id="play1">
                        <img src="/assets/play-button.png" alt="">
                        </button>
                        <button>
                        <img src="/assets/play-right.png" alt="">
                        </button>
                        </div>
                        <div class="time">
                        <p class="start-time">00:00</p>
                        <input type="range" class="range-1" id="range-1" min="0" max="100" value="0">
                        <p class="end-time">00:00</p>
                        </div>
                        </div>
                        
                        <div class="inbox-3">
                        <button>
                        <img src="/assets/volume.png" width="20px" alt="">
                        </button>
                        <input type="range" class="range-2" id="range-2" min="1" max="100" value="100">
                        </div>`;

            let audio1 = element.parentElement.previousElementSibling.previousElementSibling.children[0];
            let starttime = document.querySelector(".start-time");
            let endtime = document.querySelector(".end-time");
            let range1 = document.getElementById("range-1");
            let range2 = document.getElementById("range-2");
            let play = document.getElementById("play1");

            // console.log(play);
            audio1.play();
            play.innerHTML = `<img src="/assets/pause.png" class="pause" alt="">`;
            play.id = "pause1";

            let pause1 = document.getElementById("pause1");
            pause1.addEventListener('click', () => {
                if (audio1.paused) {
                    let play1 = document.getElementById('play1');
                    play1.innerHTML = `<img src="/assets/pause.png" class="pause" alt="">`;
                    play1.id = "pause1";
                    audio1.play();
                } else {
                    pause1.innerHTML = `<img src="/assets/play-button.png" alt="">`;
                    pause1.id = "play1";
                    audio1.pause();
                }
            });


            function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }

            if (audio1.readyState >= 1) {
                // If metadata is already loaded, set the endtime and range max
                range1.max = Math.floor(audio1.duration);
                endtime.textContent = formatTime(audio1.duration);
            }

            audio1.addEventListener('timeupdate', () => {
                range1.value = Math.floor(audio1.currentTime);
                starttime.textContent = formatTime(audio1.currentTime);
            });

            range1.addEventListener('input', () => {
                audio1.currentTime = range1.value;
            });

            range2.addEventListener('input', () => {
                audio1.volume = range2.value / 100;
            });

        })
    });
}

async function hamburger() {

    document.querySelector(".img-6").addEventListener('click', () => {
        document.querySelector(".container-1").style.left = '0';
        document.querySelector(".Playlist").style.display = "none";
    })

    document.querySelector(".img-5").addEventListener('click', () => {
        document.querySelector(".container-1").style.left = '-100%';
        document.querySelector(".Playlist").style.display = "block";
    })
}
async function main() {
    let foldersname = await foldername()
    let imagename = await getimage(foldersname)
    insertfolder(foldersname, imagename)
    let song = await getsongs(foldersname);
    await getassets(song, imagename);
    await playsong();
    await hamburger()
}

main()