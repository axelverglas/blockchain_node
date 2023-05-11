import Blockchain from '../src/BlockChain';

describe('Blockchain', () => {
    let blockchain: Blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    test('starts with the genesis block', () => {
        expect(blockchain.chain[0].data).toEqual('Genesis Block');
    });

    test('adds a new block', () => {
        const data = { amount: 50 };
        blockchain.addBlock(data);
        expect(blockchain.chain[1].data).toEqual(data);
    });

    test('validates a valid chain', () => {
        blockchain.addBlock({ amount: 50 });
        blockchain.addBlock({ amount: 30 });
        expect(blockchain.isValid()).toBe(true);
    });

    test('invalidates a chain with tampered data', () => {
        blockchain.addBlock({ amount: 50 });
        blockchain.addBlock({ amount: 30 });
        blockchain.chain[1].data.amount = 100;
        expect(blockchain.isValid()).toBe(false);
    });

    test('invalidates a chain with tampered previous hash', () => {
        blockchain.addBlock({ amount: 50 });
        blockchain.addBlock({ amount: 30 });
        blockchain.chain[1].previousHash = 'tampered';
        expect(blockchain.isValid()).toBe(false);
    });

    test('invalidates a chain with tampered hash', () => {
        blockchain.addBlock({ amount: 50 });
        blockchain.addBlock({ amount: 30 });
        blockchain.chain[1].hash = 'tampered';
        expect(blockchain.isValid()).toBe(false);
    });
});
