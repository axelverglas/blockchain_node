// tests/Block.test.ts

import Block from '../src/Block';

describe('Block', () => {
    let previousBlock: Block;
    let newBlock: Block;
    let data: any;

    beforeEach(() => {
        previousBlock = new Block(0, 'Genesis Block');
        data = { amount: 50 };
        newBlock = new Block(1, data, previousBlock.hash);
    });

    test('creates a block with the correct index', () => {
        expect(newBlock.index).toEqual(1);
    });

    test('creates a block with the correct data', () => {
        expect(newBlock.data).toEqual(data);
    });

    test('creates a block with the correct previousHash', () => {
        expect(newBlock.previousHash).toEqual(previousBlock.hash);
    });

    test('calculates the correct hash for a block', () => {
        const calculatedHash = newBlock.calculateHash();
        expect(newBlock.hash.length).toEqual(calculatedHash.length);
    });

    test('mines a block with the correct difficulty', () => {
        const difficulty = 2;
        newBlock.mineBlock(difficulty);
        expect(newBlock.hash.substring(0, difficulty)).toEqual('00');
    });
});
