import React from 'react';
import Aloitin from './Ohjaus';
import Speech from 'react-speech';

class Ohjaus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      moves: "",
      moveStrings: "",
      counter: 0,
      said: false,
      gamemode: false,
      score: 0,
      highScore: 0,
      gameEnded: false,
      gameSetDuration: 0,
    }
  }

  generate(gamemode, duration, addScore, restart) {
    // Generate a set of movements for a run or as solo moves
    let pool = ["Step Vault", "Monkey Vault", "Side Vault", "Lazy", "Dash"];
    let maxRepeats = 5;
    let maxMoves = 5;

    // I think there is a simpler JS-way to do this but w/e
    let numMoves = Math.floor(Math.random() * maxMoves);
    const moveArray = [];
    if (numMoves < 1) {
      numMoves = 1;
    }

    for (let i = 0; i < numMoves; i++) {
      let moveSelector = Math.floor(Math.random() * pool.length);
      let move = pool[moveSelector];
      let moveRepeats = Math.floor(Math.random() * maxRepeats);
      if (moveRepeats < 1) {
        moveRepeats = 1;
      }
      moveArray[i] = `${move} * ${moveRepeats}`
    }

    // TODO: Only creates One move with repeats now
    let moveStrings = moveArray.map(move => <li>{move}</li>)

    if (gamemode) {
      // If adding score during generation, don't generate new counter
      if (!addScore) {

          this.setState({counter: duration})
          this.setState({gameSetDuration: duration})
          this.setState({interval: setInterval(() => {
            this.setState({counter: this.state.counter - 1})
              if (this.state.counter < 0) {
                clearInterval(this.state.interval)
                this.endGame();
                }
              }, 1000)
            });
          if (restart) {
            this.setState({score: 0})
            this.setState({gameEnded: false})
          }
        } else {
          this.setState({score: this.state.score + 1})
        }
    }

    this.setState({moves: moveStrings});
    this.setState({moveStrings: moveArray.toString()})
    this.setState({said: false})
    this.setState({gamemode: gamemode});

    return moveStrings;
  }

  componentDidUpdate() {
    // super.componentDidMount();
    let btn = document.getElementsByClassName("rs-play");

    if (btn.length > 0 && this.state.said !== true) {
      btn[0].click();
      this.setState({said: true})
    }
  }

  endGame() {
    this.setState({gameEnded: true})
    this.setHighScore();
  }

  setHighScore() {
    if (this.state.score > this.state.highScore) {
      this.setState({highScore: this.state.score})
    }
  }

  render() {
    if (this.state.started === true) {

      return (
        <div className="ohjaus">
            <p>
              <b>Tee seuraavat liikkeet:</b>
            </p>

            <ul class="lista">
              {this.state.moves}
            </ul>
            <p>
              <Speech text={this.state.moveStrings} rate={0.75} onClick={() => this.generate()}/>
            </p>
            <p>
            {this.state.gamemode === true &&
              <div class="peliohjaimet">
                <p>Pisteet {this.state.score} (session kovin: {this.state.highScore})</p>
                <p>Aikaa {this.state.counter}s</p>
                {this.state.gameEnded === false &&
                  <button class="bigbutton" onClick={() => this.generate(true, 0, true)}>Lunasta</button>
                }
              </div>
            }
            </p>
            <p>
            {this.state.gameEnded === true &&
              <button class="bigbutton" onClick={() => this.generate(true, this.state.gameSetDuration, false, true)}>Uudestaan</button>
            }

            </p>
            <p>
            {!this.state.gamemode === true &&
              <button class="bigbutton" onClick={() => this.generate()}>Generoi uudet</button>
            }
            </p>
            <p>
              <button class="bigbutton" onClick={() => window.location.reload()}>Valikkoon</button>
            </p>
        </div>

      );
    }
    return (
      <div className="ohjaus">
        <button onClick={() => {
          // Generate a new "game"
          this.setState({started: true});
          this.generate(false);}
        }>Harjoittelu</button>
        <button onClick={() => {
          // Generate a new "game"
          this.setState({started: true});
          this.generate(true, 60);}
        }>Pelitila 1min</button>
        <button onClick={() => {
          // Generate a new "game"
          this.setState({started: true});
          this.generate(true, 180);}
        }>Pelitila 3min</button>
        <button onClick={() => {
          // Generate a new "game"
          this.setState({started: true});
          this.generate(true, 180);}
        }>Pelitila 7min</button>
      </div>
    )
  }
}

export default Ohjaus;
