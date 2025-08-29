import React from "react";
import { Principal } from "@dfinity/principal";
function Transfer({ actor }) {
  const [recipientId, setRecipientId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [feedback, setFeedback] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [isHiden, setIsHidden] = React.useState(true);
  async function handleClick() {
    setIsHidden(true);
    setIsDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const transferAmount = Number(amount);
    const result = await actor.transfer(recipient, transferAmount);
    setFeedback(result);
    setIsHidden(false);
    setRecipientId("");
    setAmount("");
    setIsDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                placeholder="Enter recipient's ID"
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={isDisabled} id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden={isHiden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
