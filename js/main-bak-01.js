/*jslint browser: true*/
/*jslint white: true */
/*jslint plusplus: true */
/*global $, jQuery, TimelineLite, TimelineMax, TweenMax*/
/*global TweenLite, Power2, CSSPlugin, console*/

function shuffle(a) {
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}

var cardIdArray = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];

shuffle(cardIdArray);
console.log(cardIdArray);

var i = 0;
$('.cardBack').each(function(index){
  console.log(index);
  var id = cardIdArray[index];
  $(this).attr('id', id);
  i++
});

CSSPlugin.defaultTransformPerspective = 1000;
TweenMax.set($(".cardBack"), {rotationY:-180});

$.each($(".cardCont"), function(i,element) {
	var frontCard = $(this).children(".cardFront"),
      backCard = $(this).children(".cardBack"),
      tl = new TimelineMax({paused:true});
	tl
		.to(frontCard, 1, {rotationY:180})
		.to(backCard, 1, {rotationY:0},0)
		.to(element, .5, {z:50},0)
		.to(element, .5, {z:0},.5);
	element.animation = tl;
});
// $('#add').on('click', function() {
// $(".cardCont").hover(elOver, elOut);
$(".cardCont").on('click', elOver);

function elOver() {
    this.animation.play();
}

function elOut() {
    this.animation.reverse();
}

// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// }

// // unnamed
// var Rectangle = class {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// };
//
// // named
// var Rectangle = class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
// };
