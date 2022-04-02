import logo from './logo.svg';
import './App.css';
import Ohjaus from './Ohjaus.js';


function App() {

    return (
      <div className="App">
        <header className="App-header">
          <p>
            P-Ohjaaja 9000.5

          </p>
          <Ohjaus started={false}/>

          <p>
          Demo toteutettu

          </p>
          <p>
            <a
              className="App-link"
              href="https://sivistymattomat.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sivistymättömille 2022
            </a>
          </p>
        </header>
      </div>
    );
}

export default App;
