import { useState } from 'react';
import { Results } from '../components/Results';

export function QuickDraw() {
  const [isStarted, setIsStarted] = useState(false);

  if (isStarted) {
    // GAME LOGIC will go here

    return (
      <Results gameId={2} setIsStarted={setIsStarted} gameName={'QuickDraw'} />
    );
  }

  return (
    // INSTRUCTIONS PAGE will go here
    <button onClick={() => setIsStarted(true)}> Click Me!</button>
  );
}

// Define an instructions page
// Define a start area that starts the timer on mouse hover.
// Define the logic: if the mouse leaves the start area before the timer starts, end the game and display the time as D/Q
// Define the end position div and place it on the right side of the screen. BG Red and circle.
// Once timer starts, Display the end goal, some text indicating that the game has started, and the timer.
// Once the User Hovers the end point, stop the timer and show the results screen with the game ID. Reminder that millisecondsPassed is part of the useContext.
