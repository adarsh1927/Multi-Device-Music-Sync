# Multi Device Music-Sync
This web app seamlessly synchronizes music playback across multiple devices connected to the same network. To adjust the playback position, simply use the seek bar on the admin page.  

---
Before using the app, please ensure you specify your local IP address in the following files:
* main.py
* user.js

---
Be the Admin:

1. Run main.py
2. Go to the browser write http://your-network-local-ip:7000/admin
3. Choose the music from your device
4. press upload button

---
The music-playing devices follow me:

1. Go to the browser of all devices write http://your-network-local-ip:7000 
2. Must click the "yes, I want to Listen" button on all connected device
3. Admin can also perform this action in a new tab
4. Now, leave them alone. Don't touch the play button

---
Role of admin again:

1. On the admin page, use the seek bar to control the music playback position.
2. To start playback from the beginning, you may need to first move the seek bar to a different position and then back to zero.

---
Note:  
* All devices must be connected to the same local network.
* Before running the app, you'll need to specify your local IP address in the following files:
    1. main.py: You'll find this on the very last line of the file. Make sure to specify the host with your local IP address.
    2. user.js: This file contains lines related to socket connections. You'll need to specify your local IP address in those lines.
* To get everyone's music perfectly in sync, you'll need to give the seek bar a little 'tease'.  Just slide it back and forth a tiny bit. This helps all the devices lock in together.