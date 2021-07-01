import {Fragment, useEffect, useRef} from 'react';
import Component from './Component';

function App() {

  let background1Ref = useRef();
  let background2Ref = useRef();
  let foreground1Ref = useRef();
  let foreground2Ref = useRef();
  let redQueen_alice_spriteRef = useRef();
  var sceneryFrames =   [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }   
  ];
  
  var sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };
  
  var sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };
  
  var spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }   
  ];

useEffect(() => {
  
  var background1Movement = background1Ref.current.animate(
    sceneryFrames, sceneryTimingBackground);
    background1Movement.currentTime = background1Movement.effect.getTiming().duration / 2;
    var background2Movement = background2Ref.current.animate(
      sceneryFrames, sceneryTimingBackground);

      var foreground1Movement = foreground1Ref.current.animate(
        sceneryFrames, sceneryTimingForeground);
        foreground1Movement.currentTime = foreground1Movement.effect.getTiming().duration / 2;
        
        var foreground2Movement = foreground2Ref.current.animate(
        sceneryFrames, sceneryTimingForeground);

        var redQueen_alice = redQueen_alice_spriteRef.current.animate(
          spriteFrames, {
            easing: 'steps(7, end)',
            direction: "reverse",
            duration: 600,
            playbackRate: 1,
            iterations: Infinity
          });

          var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

    function adjustBackgroundPlayback () {
      if (redQueen_alice.playbackRate < .8) {
        sceneries.forEach(function(anim) {
          anim.playbackRate = redQueen_alice.playbackRate/2 * -1;
        });
      } else if (redQueen_alice.playbackRate > 1.2) {
        sceneries.forEach(function(anim) {
          anim.playbackRate = redQueen_alice.playbackRate/2;
        });
      } else {
        sceneries.forEach(function(anim) {
          anim.playbackRate = 0;    
        });
    }   
  }
      setInterval( function() {
        /* Set decay */
        if (redQueen_alice.playbackRate > .4) {
          redQueen_alice.playbackRate *= .9;    
        } 
        adjustBackgroundPlayback();
      }, 3000);
      
      var goFaster = function() {
        /* But you can speed them up by giving the screen a click or a tap. */
        redQueen_alice.playbackRate *= 1.1;
        adjustBackgroundPlayback();
      }
      document.addEventListener("click", goFaster);
      document.addEventListener("touchstart", goFaster);
      adjustBackgroundPlayback()
})

  return (
    <>
  <Component
    background1Ref = { background1Ref }
    background2Ref = { background2Ref }
    foreground1Ref = { foreground1Ref }
    foreground2Ref = { foreground2Ref }
    redQueen_alice_spriteRef = { redQueen_alice_spriteRef }
  />
</>
  )
}

export default App;
