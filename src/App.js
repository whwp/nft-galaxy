//import logo from "./logo.svg";
//import "./App.css";
import { useState } from "react";
import Input_form from "./components/Input_form";
import Result from "./components/Result";
function App() {
  const [address, setAddress] = useState("");
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [updateResult, setUpdateResult] = useState(false);

  return (
    <div className="App container">
      <h1 className="text-center">NFT Galaxy</h1>
      <p className="text-center">on Ethereum blockchain</p>
      <br />
      <Input_form
        setAddress={setAddress}
        setIsFirstLoading={setIsFirstLoading}
        setIsValidAddress={setIsValidAddress}
        setUpdateResult={setUpdateResult}
      />
      <Result
        address={address}
        isFirstLoading={isFirstLoading}
        isValidAddress={isValidAddress}
        updateResult={updateResult}
        setUpdateResult={setUpdateResult}
      />
    </div>
  );
}

export default App;
