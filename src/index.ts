import Blockchain from "./blockchain";
import { Data } from "./models/data";

const myBlockchain = new Blockchain();

console.log("Mining block 1...");
myBlockchain.addBlock({ id: 1, receiver: "Alice", sender: "Bob", amount: 50 });

console.log("Mining block 2...");
myBlockchain.addBlock({ id: 2, receiver: "Bob", sender: "Alice", amount: 30 });

console.log("Mining block 3...");
myBlockchain.addBlock({ id: 3, receiver: "Charlie", sender: "Alice", amount: 10 });

console.log("Blockchain: ", JSON.stringify(myBlockchain, null, 2));

console.log("Is blockchain valid? ", myBlockchain.isValid());

// Essayer de modifier les données d'un bloc pour simuler une attaque
(myBlockchain.chain[1].data as Data).amount = 100;

console.log("After tampering, is blockchain valid? ", myBlockchain.isValid());