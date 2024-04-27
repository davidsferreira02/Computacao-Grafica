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
        const baseWidth = Math.floor(this.numRocks / 3); // Largura da base da pirâmide
        const numRows = Math.ceil(this.numRocks / baseWidth); // Número de linhas na pirâmide

        // Definir os incrementos de deslocamento para cada linha
        const offsetXIncrement = 0; // Deslocamento horizontal entre rochas
        const offsetYIncrement = 0; // Deslocamento vertical entre linhas
        const offsetZIncrement = 0; // Deslocamento frontal entre linhas

        let currentRow = 0; // Índice da linha atual
        let currentOffsetX = 0; // Deslocamento horizontal atual
        let currentOffsetY = 0; // Deslocamento vertical atual
        let currentOffsetZ = 0; // Deslocamento frontal atual

        // Loop para organizar as rochas em uma pirâmide
        for (let i = 0; i < this.numRocks; i++) {
            const rock = this.rocks[i];

            // Aplicar os deslocamentos na matriz de transformação
            this.scene.pushMatrix();
            this.scene.translate(currentOffsetX + 2*rock.x, currentOffsetY + 2*rock.y, currentOffsetZ + 2*rock.z);

            // Exibir a rocha na posição atual
            this.rocks[i].display();

            // Restaurar a matriz de transformação
            this.scene.popMatrix();

            // Incrementar os deslocamentos para a próxima rocha
            currentOffsetX += offsetXIncrement;
            currentOffsetY += (currentRow + 1) * offsetYIncrement; // Incrementar mais verticalmente para cada nova linha
            currentOffsetZ += (numRows - currentRow) * offsetZIncrement; // Incrementar menos frontalmente para cada nova linha

            // Verificar se é necessário mudar para a próxima linha
            if (i % baseWidth === baseWidth - 1) {
                currentOffsetX = 0; 
                currentOffsetY ++;
                currentOffsetZ = 0; 
            }
        }

    }
}