import Blockchain from "./blockchain";

const myBlockchain = new Blockchain();

console.log("Mining block 1...");
myBlockchain.addBlock({ amount: 50 });

console.log("Mining block 2...");
myBlockchain.addBlock({ amount: 30 });

console.log("Mining block 3...");
myBlockchain.addBlock({ amount: 10 });

console.log("Blockchain: ", JSON.stringify(myBlockchain, null, 2));

console.log("Is blockchain valid? ", myBlockchain.isValid());

// Essayer de modifier les données d'un bloc pour simuler une attaque
myBlockchain.chain[1].data.amount = 100;

console.log("After tampering, is blockchain valid? ", myBlockchain.isValid());