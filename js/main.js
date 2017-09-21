/* jslint global $ CSSPlugin TweenMax TimelineMax console:true */
/*global $ CSSPlugin TweenMax TimelineMax console:true*/
/* eslint indent: ["error", 2, { "SwitchCase": 1 }] */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

$(document).ready(function () {
  'use strict';

  var i, j, clickedCard, testCard, testCardPos, clickedPos, tcp, ccp,
    activeCount = 0, matchedPairs = 0,
    cardIdArray = ['1a', '1b', '2a', '2b', '3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b'],
    cardClickedArray = [false, false, false, false, false, false, false, false, false, false, false, false];

  $('#alert').css('opacity', '0');
  $('#alert').css('display', 'none');

  function hideIt(){
    $('#alert').css('display', 'none');
  }

  function displayAlert(alertHTML) {
    $('#alert').css('display', 'block');
    $('#alert').html(alertHTML);
    $('#alert').fadeTo(1500, 1); // one second, to 100% opacity
    $.when($('#alert').fadeTo(1000, 0)).done(function(){hideIt();});
  }

  function shuffle(a) {
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
  function reverseTwo (self) {
    tcp.animation.reverse();
    self.animation.reverse();
    cardClickedArray[clickedPos] = false;
    cardClickedArray[testCardPos] = false;
  }
  shuffle(cardIdArray);

  $('.cardBack').each(function(index){
    var id = cardIdArray[index];
    $(this).attr('id', id);
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
  TweenMax.set($('.cardBack'), {rotationY:-180});

  $.each($('.cardCont'), function(i,element) {
    var frontCard = $(this).children('.cardFront'),
      backCard = $(this).children('.cardBack'),
      tl = new TimelineMax({paused:true});
    tl
      .to(frontCard, 1, {rotationY:180})
      .to(backCard, 1, {rotationY:0},0)
      .to(element, .5, {z:50},0)
      .to(element, .5, {z:0},.5);
    element.animation = tl;
  });

  $('.cardCont').on('click', function() {
    clickedCard = $(this).find(':first-child').attr('id'); // 2-char id
    clickedPos = cardIdArray.indexOf($(this).find(':first-child').attr('id')); // int
    console.log(cardClickedArray[clickedPos]);

    if (cardClickedArray[clickedPos] === false){
      cardClickedArray[clickedPos] = true;
      this.animation.play();
      if (activeCount === 0) {
        activeCount = 1;
        testCard = clickedCard;
        testCardPos = clickedPos;
        tcp = $('#' + testCard).parent();
        tcp = tcp[0];
        ccp = $('#' + clickedCard).parent();
        ccp = ccp[0];
      } else { // one card has been flipped. time to chack for a match.
        activeCount = 0;
        cardClickedArray[clickedPos] = false;
        if (testCard.charAt(0) === clickedCard.charAt(0)) {
          matchedPairs += 1;
          if (matchedPairs === 6) {
            displayAlert('You win!');
          } else {
            displayAlert('You got a match!');
          }
        } else {
          displayAlert('No match -- try again!');
          var self=this;
          setTimeout(function() { reverseTwo(self); }, 2000);
        }
      }
    } else {
      // do nothing
    }

    // console.log('<<<>>>>');
    // console.log(tcp);
    // console.log(ccp);
    // console.log('<<<>>>>');
    // console.log("ACTIVE COUNT");
    // console.log(activeCount);
    // console.log("^^^^^^");
    // console.log("");
  });
});
