$(document).ready(function(){
	//Initialize Firebase
	var config = {
		apiKey: "AIzaSyB_2REWDGxg7TDvOlW4ykycUDCtSW2Tu_c",
		authDomain: "nate-s-project.firebaseapp.com",
		databaseURL: "https://nate-s-project.firebaseio.com",
		projectId: "nate-s-project",
		storageBucket: "nate-s-project.appspot.com",
		messagingSenderId: "792831521794"
	};
	firebase.initializeApp(config);

	var database = firebase.database();

	$("#submit").on("click", function(event) {
		event.preventDefault();

		var trainInput = $("#train-name-input").val().trim();
		var destInput = $("#destination-input").val().trim();
		var firstTrainInput = $("#first-train-time-input").val().trim();
		var freqInput = $("#frequency-input").val().trim();

		var newTrain = {
			"Train-Name": trainInput,
			"Destination": destInput,
			"First-Train": firstTrainInput,
			"Frequency": freqInput
		};

		database.ref().push(newTrain);

		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#first-train-time-input").val("");
		$("#frequency-input").val("");

	})
});