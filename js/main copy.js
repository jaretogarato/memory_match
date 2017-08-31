/*jslint browser: true*/
/*jslint white: true */
/*jslint plusplus: true */
/*global $, jQuery, TimelineLite, TimelineMax, TweenMax*/
/*global TweenLite, Power2, CSSPlugin, console*/

//$(document).ready(function () {
  "use strict";
  var i, j, clickedCard, testCard, testCardPos, clickedPos, tcp, ccp, delayVar, 
    activeCount = 0,
    cardIdArray = ['1a', '1b', '2a', '2b', '3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b'],
    cardClickedArray = [false, false, false, false, false, false, false, false, false, false, false, false];

  function shuffle(a) {
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
  function reverseTwo (self) {
    console.log('@@@@@@@@ reverse two has been called');
    console.log("...");
    console.log(tcp);
    console.log("...");
    tcp.animation.reverse();
    self.animation.reverse();
    cardClickedArray[clickedPos] = false;
    cardClickedArray[testCardPos] = false;
  }

  shuffle(cardIdArray);

  // i = 0;
  $('.cardBack').each(function(index){
    var id = cardIdArray[index];
    $(this).attr('id', id);
    // i++;
  });
  
  $('#1a').css('background-image', 'url(images/01-alien.png)');
  $('#1b').css('background-image', 'url(images/01-alien.png)');
  $('#2a').css('background-image', 'url(images/02-alien.png)');
  $('#2b').css('background-image', 'url(images/02-alien.png)');
  $('#3a').css('background-image', 'url(images/03-alien.png)');
  $('#3b').css('background-image', 'url(images/03-alien.png)');
  $('#4a').css('background-image', 'url(images/04-alien.png)');
  $('#4b').css('background-image', 'url(images/04-alien.png)');
  $('#5a').css('background-image', 'url(images/05-alien.png)');
  $('#5b').css('background-image', 'url(images/05-alien.png)');
  $('#6a').css('background-image', 'url(images/06-alien.png)');
  $('#6b').css('background-image', 'url(images/06-alien.png)');

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
  
  $(".cardCont").on('click', function() {
    clickedCard = $(this).find(':first-child').attr('id'); // 2-char id
    clickedPos = cardIdArray.indexOf($(this).find(':first-child').attr('id')); // int
    // first branch should be: has the card been matched
    // console.log(cardClickedArray[clickedPos]);

    if (cardClickedArray[clickedPos] === false){
      // console.log("t or f 1:");
      // console.log(cardClickedArray[clickedPos]);
      cardClickedArray[clickedPos] = true;
      // console.log("t or f 1:");
      // console.log(cardClickedArray[clickedPos]);
      this.animation.play();
      if (activeCount === 0) {
        activeCount = 1; 
        testCard = clickedCard;
        testCardPos = clickedPos;
        tcp = $("#" + testCard).parent();
        tcp = tcp[0];
        ccp = $("#" + clickedCard).parent();
        ccp = ccp[0];
      } else { // one card has been flipped. time to chack for a match. 
        activeCount = 0;
        console.log("$$$");
        console.log(testCard);
        console.log(clickedCard);
        console.log("$$$");
        cardClickedArray[clickedPos] = false;
        
        if (testCard.charAt(0) === clickedCard.charAt(0)) {
          alert("they match!");
        } else {
          // the following line prevents the card from being flipped
          // it looks like the delay for the reverse call isn't happening
          console.log('@@@@@@@@ set timeout being called');
          // delayVar = setTimeout(reverseTwo(this), 2000);
          // delayVar = setTimeout(alert('fudge'), 2000);
          var self=this;
          console.log('self vvvv');
          console.log(self);
          setTimeout(function() { reverseTwo(self); }, 2000)
          console.log('@@@@@@@@ set timeout has been called');
        }
      }
    } else {
      // do nothing  
    }

    console.log('<<<>>>>');
    console.log(tcp);
    console.log(ccp);
    console.log('<<<>>>>');

    console.log("ACTIVE COUNT");
    console.log(activeCount);
    console.log("^^^^^^");
    console.log("");

      // if (activeCount === 0) { // this is the first card of an attempted match
      //   activeCount = 1;
      //   testCard = clickedCard;  // 2-char id

      // } else if (activeCount === 1) {
      //   activeCount = 0;

      //   if (testCard.charAt(0) === clickedCard.charAt(0)) {
      //     // see if the two start with the same ID
      //     alert("We have a match!")
          
      //   } else {
      //     //var foo = $("#" + testCard).parent();
      //     var foo = $("#" + clickedCard).parent();
      //     var bar = foo[0];

      //     bar.animation.reverse();
      //     // foo.animation.reverse();
      //   }
      // }
    // }

    // 1) Can you click on a card? If so:
    // Is it the first or second card in a math pair?


    // console.log("----------" + clickedCard);
    // console.log($("#" + clickedCard));
    // var foo = $("#" + clickedCard).parent();
    // var bar = foo[0];
    // console.log(bar);
    // function doit () {
    //   bar.animation.reverse();
    // }
    // bar.animation.play();
    // setTimeout(doit(), 2000);
    
  });
//});

