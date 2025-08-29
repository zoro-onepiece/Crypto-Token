import React, { useState } from "react";
import { Principal } from "@dfinity/principal";

function Balance({actor}) {

  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isHidden ,setIsHidden] = useState(true);
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await actor.getBalance(principal);

    setBalanceResult(balance.toLocaleString());
    setSymbol(await actor.getSymbol());
    setIsHidden(false);

  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsHidden(false)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult}{symbol}</p>
    </div>
  );
}

export default Balance;
