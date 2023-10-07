import io from 'socket.io-client';

// Allow for local network access
const host = window.location.hostname === 'localhost' ? 'localhost' : '192.168.0.11';

const socket = io(`http://${host}:3000`, { transports: ['websocket', 'polling'] });

export default socket;