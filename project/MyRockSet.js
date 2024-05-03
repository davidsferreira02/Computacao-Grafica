import { MyRock } from './MyRock.js';
import { CGFobject,CGFtexture } from '../lib/CGF.js';

export class MyRockSet extends CGFobject {
    constructor(scene, nrOfRocks) {
        super(scene);
        this.nrOfRocks = nrOfRocks;
        this.rocks = [];
        this.initRocks();
    }

    initRocks() {

   
        let rocksPlaced = 0;
        let currentLayerRocks = 1;
        let currentY = (this.nrOfRocks - 1) * 0.5 * 0.6; // Começa do centro da pirâmide

        for (let layer = 0; rocksPlaced < this.nrOfRocks; layer++) {
            const slices = 10;
            const stacks = 10;
            const radius = 0.5;
            const scale = 1.1;

            for (let i = 0; i < currentLayerRocks && rocksPlaced < this.nrOfRocks; i++, rocksPlaced++) {
                const rock = new MyRock(this.scene, radius, slices, stacks,  Math.random() * 0.33 + 0.7);

                const x = i * (radius * 1.2) - (currentLayerRocks - 1) * (radius * 0.6);
                const y = currentY - layer * (radius * 1.2); // Decrementa a posição Y para subir
                const z = 0;

                this.rocks.push({
                    rock,
                    scale,
                    position: [x, y, z]
                });
            }

            currentLayerRocks++; // Aumenta o número de rochas na próxima camada
        }
    }

    display() {
        this.rocks.forEach(({ rock, scale, position }) => {
            this.scene.pushMatrix();
            this.scene.translate(position[0], position[1], position[2]);
            this.scene.scale(scale, scale, scale);
            rock.display();
            this.scene.popMatrix();
        });
    }
}
