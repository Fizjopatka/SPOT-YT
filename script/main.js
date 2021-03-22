//VARIABLES
const redirect_uri = "http://127.0.0.1/SpotYT/login.html";
const AUTHORIZE = 'https://accounts.spotify.com/authorize';
let client_id = '42cf28933d634b99a1d33de82a90dacb';
let code = null;
let burgerMenuClicked = false;

//LISTENERS
document.getElementById('burger-menu').addEventListener('click', ()=> {
	burgerMenuClicked ? isClicked() : isNotClicked();
	function isClicked() {
		$('#burger').css('transform', 'translateY(calc(-6rem + -4px)');
		burgerMenuClicked = false;
	}
	function isNotClicked() {
		$('#burger').css('transform', 'translateY(calc(6rem + 4px)');
		burgerMenuClicked = true;
	}
})

//FUNCTIONS
//SPOTIFY AUTHORIZE
function onPageLoad() {
	if (window.location.search.length > 0) {
		handleRedirect();
	};
};
function handleRedirect() {
	code = getCode();
	createNewToken(code);
};
function getCode() {
	const queryString = window.location.search;

	if (queryString.length > 0) {
		const urlParams = new URLSearchParams(queryString);
		code = urlParams.get('code');
	};
	return code;
};
function requestAuthorization() {
	let url = AUTHORIZE;

	url += '?client_id=' + client_id;
	url += '&response_type=code';
	url += '&redirect_uri=' + encodeURI(redirect_uri);
	url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
	window.location.href = url;
};
//POST TOKEN CODE
function createNewToken(code) {
	const xhr = new XMLHttpRequest();

	xhr.open("POST", "http://127.0.0.1/SpotYT/access", true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({
		token_name : code
	}));
};

//CHECK USER IS LOGGED
function checkLogin(){
	getCode();
	//if (code === null) {
	//	window.open('http://127.0.0.1/SpoYT',"_self");
	//};
}

//TRANSFER TO SPOTIFY 
function transferToSpotify() {
	const youtubeName = document.getElementById('youtube-name').value;
	const playlistName = document.getElementById('playlist-name').value;

	checkInputValue(youtubeName, playlistName);
	(youtubeName.length > 2 && playlistName.length > 2) ? console.log("wysyłam!") : console.log("weź popraw:C");
}

function checkInputValue(youtubeName, playlistName) {
	const wrongMessage1 = document.getElementById('wrong-message-1');
	const wrongMessage2 = document.getElementById('wrong-message-2');

	youtubeName.length < 3 ? wrongMessage1.innerHTML = "*username is too short" : wrongMessage1.innerHTML = "";
	playlistName.length < 3 ? wrongMessage2.innerHTML = "*playlist name is too short" : wrongMessage2.innerHTML = "";
};