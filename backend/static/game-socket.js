const socket = io('http://localhost:13124/game');

socket.on('connected', (callback) => {
  callback({ name: 'nigga', token: 'cocki' });
});
