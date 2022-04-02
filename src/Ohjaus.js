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
      gamemode: false
    }
  }

  generate(gamemode) {
    // Generate a set of movements for a run or as solo moves
    let pool = ["Step Vault", "Monkey Vault", "Side Vault", "Lazy", "Dash"];
    let maxRepeats = 5;
    let maxMoves = 5;

    // I think there is a simpler JS-way to do this but w/e
    let numMoves = Math.floor(Math.random() * maxMoves);
    const moveArray = [];

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
        this.setState({counter: 30})
        this.setState({interval: setInterval(() => {
          this.setState({counter: this.state.counter - 1})
          if (this.state.counter < 0) {
            clearInterval(this.state.interval)
            this.generate(true)
          }
        }, 1000)
      });
    }

    this.setState({moves: moveStrings});
    this.setState({moveStrings: moveArray.toString()})
    this.setState({said: false})
    this.setState({gamemode: gamemode});

    return moveStrings;
  }

  componentDidUpdate() {
    // super.componentDidMount();
    console.log("Done");
    let btn = document.getElementsByClassName("rs-play");

    if (btn.length > 0 && this.state.said !== true) {
      console.log(btn[0]);
      btn[0].click();
      this.setState({said: true})
    }
  }

  render() {
    if (this.state.started === true) {

      return (
        <div className="Ohjaus">
            <p>
              <b>Tee seuraavat liikkeet:</b>
            </p>
            <ul>
              <Speech text={this.state.moveStrings} rate={0.75} onClick={() => this.generate()}/>
              {this.state.moves}
            </ul>
            <p>
            {this.state.gamemode === true &&
              <p>Aikaa {this.state.counter}s TAI</p>
            }
            </p>
            <p>
            <button onClick={() => this.generate()}>Generoi uudet</button>
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
          this.generate(true);}
        }>Pelitila</button>
      </div>
    )
  }
}

export default Ohjaus;
