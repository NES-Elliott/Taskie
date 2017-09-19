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
		freqInput = parseInt(freqInput);

		var newTrain = {
			"Train_Name": trainInput,
			"Destination": destInput,
			"Train_Arrive": firstTrainInput,
			"Train_Freq": freqInput,
			"data_time": firebase.database.ServerValue.TIMESTAMP
		};

		database.ref().push(newTrain);

		$("#train-name-input").val("");
		$("#destination-input").val("");
		$("#first-train-time-input").val("");
		$("#frequency-input").val("");
	})

	database.ref().on("child_added", function(childSnapshot) {
		var trainName = childSnapshot.val().Train_Name;
		var trainDest = childSnapshot.val().Destination;
		var trainFreq = childSnapshot.val().Train_Freq;
		var trainArrival = childSnapshot.val().Train_Arrive;

		var firstTime = moment(trainArrival, "HH:mm").subtract(1, "years");
		var diffTime = moment().diff(moment(firstTime), "minutes");
		var minUntilTrain = trainFreq - (diffTime % trainFreq);
		console.log("MINUTES UNTIL THE NEXT TRAIN: " + minUntilTrain);
		var nextTrain = moment().add(minUntilTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

		$("#train-table > tbody").append("<tr><td>" + 
			trainName + "</td><td>" + 
			trainDest + "</td><td>" + 
			trainFreq + "</td><td>" +  
			moment(nextTrain).format("HH:mm") + "</td><td>" + 
			minUntilTrain + "</td></tr>")
	})
});