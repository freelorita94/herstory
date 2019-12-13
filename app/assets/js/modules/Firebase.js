// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require('firebase/app');
// Add the Firebase products that you want to use
require('firebase/database');
//var ReactDOM = require('react-dom');

const firebaseConfig = {
	apiKey: 'AIzaSyD92Ce4HzvYMeqJFvFSdEe3yHNPMYXrs9k',
	authDomain: 'herstory-bd9f1.firebaseapp.com',
	databaseURL: 'https://herstory-bd9f1.firebaseio.com',
	projectId: 'herstory-bd9f1',
	storageBucket: 'herstory-bd9f1.appspot.com',
	messagingSenderId: '916711912288',
	appId: '1:916711912288:web:bcc7df1fc28ae093ece405',
	measurementId: 'G-414R0D8YD9'
};

export function FirebaseInit() {
	firebase.initializeApp(firebaseConfig);

	var database = firebase.database();
	var ref = database.ref('questions');
	var qCounter = 1;
	var user_answer = [];
	var rand_indexes = [];
	var right_answers = ['Sabiha Gokcen'];
	var questions = ['Who is the first female pilot?'];
	var rand;
	var i = 0;
	document.getElementById('buttonfinish').style.visibility='hidden';
	document.getElementById('buttonfinish').style.display='none';

	while (i < 12) {
		rand = Math.ceil(Math.random() * 31);
		console.warn(rand);
		if (rand_indexes.indexOf(rand) == -1) {
			rand_indexes[i] = rand;
			i++;
		}
	}
	console.warn(rand_indexes);
	document.getElementById('buttonfinish').addEventListener('click', function() {
		var count = 0;
		for(var x=0;x<12;x++){
			if (right_answers[x] === user_answer[x]) {
				count++;
			}
		}
		alert('You got ' + count + ' of out of 12 questions right!');
	});
	document.getElementById('buttonnext').addEventListener('click', function(e) {
		if (qCounter < 11) {
			e.preventDefault();
			document.getElementById('buttonfinish').style.visibility='hidden';
			document.getElementById('buttonfinish').style.display='none';
			ref.on('value', reloadquestion, errData);
		} else if (qCounter == 11) {
			e.preventDefault();
			ref.on('value', reloadquestion, errData);
			document.getElementById('buttonnext').style.visibility='hidden';
			document.getElementById('buttonnext').style.display='none';
			document.getElementById('buttonfinish').style.visibility='visible';
			document.getElementById('buttonfinish').style.display='inherit';
		} else if (qCounter == 12) {
			document.getElementById('buttonfinish').style.visibility='visible';
		}

	});

	document.getElementById('buttona').onclick = function () {
		user_answer[qCounter - 1] = document.getElementById('a').innerHTML;
		document.getElementById('buttona').setAttribute('style', 'background-color: #A40E4C');
		document.getElementById('buttonb').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonc').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttond').setAttribute('style', 'background-color: #FFFFFF');
		console.warn(user_answer);
	}
	document.getElementById('buttonb').onclick = function () {
		user_answer[qCounter - 1] = document.getElementById('b').innerHTML;
		document.getElementById('buttona').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonb').setAttribute('style', 'background-color: #A40E4C');
		document.getElementById('buttonc').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttond').setAttribute('style', 'background-color: #FFFFFF');
		console.warn(user_answer);
	}
	document.getElementById('buttonc').onclick = function () {
		user_answer[qCounter - 1] = document.getElementById('c').innerHTML;
		document.getElementById('buttona').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonb').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonc').setAttribute('style', 'background-color: #A40E4C');
		document.getElementById('buttond').setAttribute('style', 'background-color: #FFFFFF');
		console.warn(user_answer);
	}
	document.getElementById('buttond').onclick = function () {
		user_answer[qCounter - 1] = document.getElementById('d').innerHTML;
		document.getElementById('buttona').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonb').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttonc').setAttribute('style', 'background-color: #FFFFFF');
		document.getElementById('buttond').setAttribute('style', 'background-color: #A40E4C');
		console.warn(user_answer);
	}
	function reloadquestion (data) {
		if (typeof(user_answer[qCounter -1]) == 'undefined') {
			alert('Choose an answer');
		} else {
			increaseCount();
			document.getElementById('num').innerHTML = qCounter;
			document.getElementById('question').innerHTML = data.val()[rand_indexes[qCounter - 1]].question;
			right_answers[qCounter - 1] = data.val()[rand_indexes[qCounter - 1]].answer;
			questions[qCounter - 1] = data.val()[rand_indexes[qCounter - 1]].question;
			document.getElementById('a').innerHTML = data.val()[rand_indexes[qCounter-1]].choices[0];
			document.getElementById('b').innerHTML = data.val()[rand_indexes[qCounter - 1]].choices[1];
			document.getElementById('c').innerHTML = data.val()[rand_indexes[qCounter - 1]].choices[2];
			document.getElementById('d').innerHTML = data.val()[rand_indexes[qCounter - 1]].choices[3];
			document.getElementById('buttona').setAttribute('style', 'background-color: #FFFFFF');
			document.getElementById('buttonb').setAttribute('style', 'background-color: #FFFFFF');
			document.getElementById('buttonc').setAttribute('style', 'background-color: #FFFFFF');
			document.getElementById('buttond').setAttribute('style', 'background-color: #FFFFFF');
			console.warn(qCounter);
			
		}
	}
	console.warn(document.getElementById('d'));

	function increaseCount () {
		++qCounter;
	}

	function errData(err) {
		console.warn('Error!');
		console.warn(err);
	}

	
}
