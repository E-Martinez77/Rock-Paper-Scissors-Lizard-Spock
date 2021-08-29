console.log("boop");

fetch("/api/highscores")
  .then((res) => res.json())
  .then((data) => console.log(data));
