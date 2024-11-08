// Ofcourse we need to target some Dom Elements
const audioPlayer = document.getElementById('audioPlayer');
const interaction = document.getElementById('interaction');

// Load a first impression
interaction.addEventListener('click',() => {
    fetch('/music')
.then(response => response.blob())
.then(musicBlob => {
    const objectURL = URL.createObjectURL(musicBlob);
    audioPlayer.src = objectURL;
    audioPlayer.load();
})
.catch(error => console.error('Error fetching audio:', error));
})



// Socket Initialization
//  enter ws://your_local_network_ip/... yourself or create issue
const socketMusic = new WebSocket('ws://192.168.1.7:7000/music')
const socketSeek = new WebSocket('ws://192.168.1.7:7000/seekit')


// On Music change from Admin
socketMusic.onmessage = function(event) {
    const data = event.data
    if (data) {
        fetch('/music')
            .then(response => response.blob())
            .then(musicBlob => {
                const objectURL = URL.createObjectURL(musicBlob);
                audioPlayer.src = objectURL;
                audioPlayer.load();
            })
            .catch(error => console.error('Error fetching audio:', error));
    }
};

setInterval(() => {
    socketMusic.send('check music')
}, 100)



// On Seekbar change from Admin
socketSeek.onmessage = function (event) {
    const seektime = event.data
    if (seektime) {
        audioPlayer.currentTime = seektime;
        audioPlayer.play();
    }
    socketSeek.send('check seek')     
}

socketSeek.onopen = () => socketSeek.send('check seek')
    