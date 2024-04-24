import { CGFobject } from '../lib/CGF.js';
import { MyRock } from "./MyRock.js";
/**
 * MySphere
 * 
 * @constructor
 */
export class MyRockSet extends CGFobject {
  constructor(scene, numRocks) {
      super(scene);
      this.numRocks = numRocks;
      this.rocks = [];
      this.generateRocks();
    }

    generateRocks() {
        for (let i = 0; i < this.numRocks; i++) {
            const radius = Math.random() ;
            const slices = 10;
            const stacks = Math.floor(Math.random() * (5 - 1)) + 1;
            const prob = Math.random();
            const size = Math.random() * (3 - 1) + 1;
            const rock = new MyRock(this.scene, radius, slices, stacks, prob, size);
            this.rocks.push(rock);
        }
        console.log(this.rocks);
    }

    display() {
        const baseWidth = Math.floor(this.numRocks/4);  
        let currentRow = 0; 
        let currentOffset = 0; 

        // Loop through each rock and position it in the pyramid
        for (let i = 0; i < this.numRocks; i++) {
            const rock = this.rocks[i];

            // Calculate the position of the current rock
            const x = rock.radius * 2 ; 
            const y = currentOffset + (rock.radius * 2);// Increase height with each row
            const z = rock.radius * 2 ; // No offset in the z-axis for a simple pyramid

            // Apply translation to position the rock
            
            //this.scene.translate(10, 0, -100);
            this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.rocks[i].display();
            
            this.scene.popMatrix();
            

            // Increment the offset for the next rock in the row
            currentOffset += rock.radius * 2;

            // Check if we need to move to the next row
            if (currentOffset > baseWidth) {
                currentRow++; // Move to the next row
                currentOffset = 0; // Reset the offset for the new row
            }
        }
    }
}