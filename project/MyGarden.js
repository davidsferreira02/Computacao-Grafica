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
                const flower = this.createFlower(i, j);
                this.flowers[i][j] = flower;
            }
        }
    }

    createFlower(i, j) {
        const x = -i * 10; 
        const z = -j * 10; 
        return new MyFlower(this.scene, x, -60, z);
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
    getPollenPositions() {
        const positions = [];
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numColumns; j++) {
                const flower = this.flowers[i][j];
                if (flower.Haspollen) {
                    positions.push(flower.positionPollen());
                }
            }
        }
        return positions;
    }
}
