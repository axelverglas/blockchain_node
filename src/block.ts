import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public timestamp: number;
    public data: any;
    public previousHash: string;
    public hash: string;
    public nonce: number;

    constructor(index: number, data: any, previousHash: string = "") {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(): string {
        return CryptoJS.SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString(CryptoJS.enc.Hex);
    }

    mineBlock(difficulty: number): void {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

export default Block;
