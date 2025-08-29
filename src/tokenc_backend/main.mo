import Principal "mo:base/Principal";
import Map "mo:core/Map";
import Debug "mo:base/Debug";

persistent actor Token {
  private let balances = Map.empty<Principal, Nat>();

  let owner : Principal = Principal.fromText("pxu3y-52x6t-oogiu-xc5be-o4wez-73fw5-jcrnx-yba5q-52qev-dbxwt-6qe");
  let tokenSupply : Nat = 1000000000;
  let Symbol : Text = "FYR";
  if (Map.isEmpty(balances)) {
    Map.add(balances, Principal.compare, owner, tokenSupply);
  };

  public func updateBalance(p : Principal, n : Nat) : async () {
    Map.add(balances, Principal.compare, p, n);
  };

  public query func getBalance(p : Principal) : async Nat {
    let balance : Nat = switch (Map.get(balances, Principal.compare, p)) {
      case (null) 0;
      case (?result) result;
    };
    return balance;
  };

  public query func getSymbol() : async Text {
    return Symbol;
  };

  public shared (msg) func payOut() : async Text {
    if (Map.get(balances, Principal.compare, msg.caller) != null) {
      return ("You have already claimed your tokens.");
    } else {
      let amount = 100;
      let result = await transfer(msg.caller, amount);
      Debug.print(debug_show (msg.caller));
      return (result);
    };
  };

  public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
    let senderBalance = await getBalance(msg.caller);
    Debug.print("printing msg.caller");
    Debug.print(Principal.toText(msg.caller));
    Debug.print(debug_show (senderBalance));
    if (senderBalance >= amount) {
      let senderNewBalance : Nat = senderBalance - amount;
      await updateBalance(msg.caller, senderNewBalance);
      let receiverBalance = await getBalance(to);
      Debug.print("printing receiver");
      Debug.print(Principal.toText(to));
      Debug.print(debug_show (receiverBalance));
      let newReceiverBalnce = receiverBalance + amount;
      await updateBalance(to, newReceiverBalnce);
      return ("Successfully transferred ");
    } else {
      return ("Insufficient Fyre Tokens! ");
    };
  };
};
