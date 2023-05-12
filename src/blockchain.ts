import Block from "./block";

class Blockchain {
    public chain: Block[];
    public difficulty: number;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock(): Block {
        return new Block(0, { id: 0, receiver: "Genesis", sender: "Block", amount: 0 }, "0");
    }


    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(data: any): void {
        const newIndex = this.chain.length;
        const newBlock = new Block(newIndex, data, this.getLatestBlock().hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

export default Blockchain;