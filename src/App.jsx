import Filters from './page/filters/Filters';
import Artist from './page/selectedItem/components/Artist';
import Album from './page/selectedItem/components/Album';
import Basket from './page/basket/Basket';
import ErrorModal from './page/error/ErrorModal';
import './App.css';

const App = () => {
  return (
    <main className="container-fluid">
      <div className="row">
        <div className="col-3 container-left">
          <header className="header">
            <h4 className="header__title"><i className="bi bi-music-note-beamed" /> iMusic</h4>
          </header>
          <Filters />
        </div>
        <div className="col-9 container-right">
          <Basket />
          <Artist />
          <Album />
          <ErrorModal />
        </div>
      </div>
    </main>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
