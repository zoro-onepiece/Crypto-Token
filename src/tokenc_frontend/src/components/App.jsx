import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App({actor}) {

  return (
    <div id="screen">
      <Header />
      <Faucet actor={actor} />
      <Balance actor={actor}/>
      <Transfer actor={actor} />
    </div>
  );
}

export default App;
