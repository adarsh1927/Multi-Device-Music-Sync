const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const audioPlayer = document.getElementById('audioPlayer');

uploadButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('audio', file);

        // Send the file to your server
        fetch('/upload', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log('Server response:', data); 
        })
        .catch(error => {
            console.error('Upload error:', error);
        });

        // Load the file into the audio player
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
    } else {
        alert("Please select a file first");
    }
});

audioPlayer.addEventListener('seeked', () => {
    const currentTime = audioPlayer.currentTime; 
    fetch('/seeked', {
        method: 'POST',
        body: `${currentTime}` 
      })
    .then(response => response.text())
    .then(data => {
        console.log('Server response:', data); 
    })
    .catch(error => {
        console.error('error sendin seek:', error);
    });
});

// 

