import Blockchain from '../src/blockchain';
import { Data } from '../src/models/data';

describe('Blockchain', () => {
    let blockchain: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    test('starts with the genesis block', () => {
        const genesisData: Data = { id: 0, receiver: "Genesis", sender: "Block", amount: 0 };
        expect(blockchain.chain[0].data).toEqual(genesisData);
    });

    test('adds a new block', () => {
        const data: Data = { id: 1, receiver: "Alice", sender: "Bob", amount: 50 };
        blockchain.addBlock(data);
        expect(blockchain.chain[1].data).toEqual(data);
    });

    test('validates a valid chain', () => {
        blockchain.addBlock({ id: 1, receiver: "Alice", sender: "Bob", amount: 50 });
        blockchain.addBlock({ id: 2, receiver: "Bob", sender: "Alice", amount: 30 });
        expect(blockchain.isValid()).toBe(true);
    });

    test('invalidates a chain with tampered data', () => {
        blockchain.addBlock({ id: 1, receiver: "Alice", sender: "Bob", amount: 50 });
        blockchain.addBlock({ id: 2, receiver: "Bob", sender: "Alice", amount: 30 });
        (blockchain.chain[1].data as Data).amount = 100;
        expect(blockchain.isValid()).toBe(false);
    });

    test('invalidates a chain with tampered previous hash', () => {
        blockchain.addBlock({ id: 1, receiver: "Alice", sender: "Bob", amount: 50 });
        blockchain.addBlock({ id: 2, receiver: "Bob", sender: "Alice", amount: 30 });
        blockchain.chain[1].previousHash = 'tampered';
        expect(blockchain.isValid()).toBe(false);
    });

    test('invalidates a chain with tampered hash', () => {
        blockchain.addBlock({ id: 1, receiver: "Alice", sender: "Bob", amount: 50 });
        blockchain.addBlock({ id: 2, receiver: "Bob", sender: "Alice", amount: 30 });
        blockchain.chain[1].hash = 'tampered';
        expect(blockchain.isValid()).toBe(false);
    });
});
