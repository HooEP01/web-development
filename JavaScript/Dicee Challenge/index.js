var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

// var randomDiceImage1 = "dice" + randomNumber1 + ".png";
// var randomImageSource1 = "./images/" + randomDiceImage1;

document.querySelector('.img1').setAttribute('src', './images/dice' + randomNumber1 + '.png')
document.querySelector('.img2').setAttribute('src', './images/dice' + randomNumber2 + '.png')

var text = "";
if(randomNumber1 > randomNumber2) {
    text = "Player 1 win!🚩"
} 
else if(randomNumber2 > randomNumber1) {
    text = "Player 2 win!🚩"
} 
else {
    text = "Draw!"
}
document.querySelector('h1').innerText = text;