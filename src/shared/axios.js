import axios from 'axios';

const production = true;
const url = production ? 'https://video-game-reviews-backend.herokuapp.com/' : 'http://localhost:8080';

const instance = axios.create({
	baseURL: url
});

export default instance;
