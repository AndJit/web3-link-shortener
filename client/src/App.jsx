import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Header from "./components/Header";
import LinkShortenerElement from "./components/LinkShortenerElement";
import ShortingResult from "./components/ShortingResult";
import {useState} from "react";

function App() {

    const [value, setValue] = useState("");

    return (
    <EthProvider>
      <div id="App" >

        <div className="container">
          <Header />
          <LinkShortenerElement setValue={setValue} />
          <ShortingResult lastResult={value}/>
        </div>
      </div>
    </EthProvider>
  );
}



export default App;
