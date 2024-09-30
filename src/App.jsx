import { useState } from "react";
import PropTypes from "prop-types";

import "./App.css";

// to fix error: 'minDamage' and 'maxDamage' is missing in props validation
// PropTypes are simply a mechanism that ensures that the passed value is of the correct datatype. This makes sure that we don’t receive an error at the very end of our app by the console which might not be easy to deal with.
App.propTypes = {
  minDamage: PropTypes.number,
  maxDamage: PropTypes.number,
}

const App=({ minDamage = 0, maxDamage = 30 })=> {
  // task 1
  const INITIAL_HEALTH = 100;
  
  const [playerHealth, setPlayerHealth] = useState(INITIAL_HEALTH);
  const [enemyHealth, setEnemyHealth] = useState(INITIAL_HEALTH);

  // task 2
  const INITIAL_GAME_STATUS = "active"; // MONITOR GAME: active play or end of game
  const [gameStat, setGameStat] = useState(INITIAL_GAME_STATUS); // can be either win, loss or draw

  // task 4
  function handleFire() {
    // random damage amounts for both

    const playerAttack =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;
    const enemyAttack =
      Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

    const newPlayerHealth = Math.max(playerHealth - enemyAttack, 0);
    const newEnemyHealth = Math.max(enemyHealth - playerAttack, 0);

    setPlayerHealth(newPlayerHealth);
    setEnemyHealth(newEnemyHealth);

    // Check rounds of attacks and update game status
    if (newPlayerHealth === 0 && newEnemyHealth === 0) {
      setGameStat("draw");
    } else if (newPlayerHealth === 0) {
      setGameStat("loss");
    } else if (newEnemyHealth === 0) {
      setGameStat("win");
    }
  }

  // Task 6: game reset
  function handleRestart() {
    setPlayerHealth(INITIAL_HEALTH);
    setEnemyHealth(INITIAL_HEALTH);
    setGameStat(INITIAL_GAME_STATUS);
  }

  function renderHealth(health) {
    let emoji;
    if (health === INITIAL_HEALTH) {
      emoji = "❤️";
    } else if (health === 0) {
      emoji = "💀";
    } else {
      emoji = "❤️‍🩹 ";
    }
    return `${health} ${emoji}`;
  }

  {
    /* task 5: end of game  */
  }
  function renderMessage() {
    switch (gameStat) {
      case "win":
        return "Congratulations! 😎💪 You've successfully defended your spacecraft.";
      case "loss":
        return "Mission Failed. 😵️ Your spacecraft has been defeated.";
      case "draw":
        return "It's a draw! 🤝 Both spacecrafts have been neutralized.";
      default:
        return "Engage the enemy! ☄️";
    }
  }

  return (
    <div className="main-container">
      <h1> Space Battle Simulator</h1>

      <div className="game-container">
        {/* show playerHealth */}
        <div className="player">
          <p> Player Health: {renderHealth(playerHealth)}</p>
        </div>

        {/* task 3 */}

        {gameStat === "active" ? (
          <div className="attack">
            <button onClick={handleFire}>Fire</button>
          </div>
        ) : (
          <div className="restart">
            <button onClick={handleRestart}>Restart</button>
          </div>
        )}

        {/* show enemy health */}
        <div className="enemy">
          <p>Enemy Health: {renderHealth(enemyHealth)}</p>
        </div>
      </div>

      <div className="result-container">
        <p> {renderMessage()}</p>
      </div>
    </div>
  );
}

export default App;
