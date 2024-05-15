import { CGFobject } from '../lib/CGF.js';
import { MyFlower } from './MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, numRows, numColumns) {
        super(scene);
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.flowers = [];
        this.createFlowers();
    }

    createFlowers() {
        for (let i = 0; i < this.numRows; i++) {
            this.flowers[i] = [];
            for (let j = 0; j < this.numColumns; j++) {
                const x = i * 20; // adjust spacing as needed
                const z = j * 20; // adjust spacing as needed
                const flower = new MyFlower(this.scene, x, 0, z);
                this.flowers[i][j] = flower;
            }
        }
    }

    display() {
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                this.scene.pushMatrix();
                this.flowers[i][j].display();
                this.scene.popMatrix();
            }
        }
    }
}
