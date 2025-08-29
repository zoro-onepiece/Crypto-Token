import React from "react";

function Faucet({actor}) {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [buttonText ,setButtonText] = React.useState("Gimme gimme");
  async function handleClick(event) {
    setIsDisabled(true);
     const result= await actor.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Fyre tokens here! Claim 100FYR tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}
        disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
