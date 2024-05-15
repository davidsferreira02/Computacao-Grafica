import { CGFobject } from '../lib/CGF.js';

/**
 * MyStem - Represents a stem-like 3D object in a graphics scene.
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, radius, height) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.radius = radius;
        this.height = height;
        this.initBuffers();
    }

    initBuffers() {
        const vertexCount = (this.slices + 1) * (this.stacks + 1);
        this.vertices = new Float32Array(vertexCount * 3);
        this.indices = new Uint16Array(this.slices * this.stacks * 6);
        this.normals = new Float32Array(vertexCount * 3);
        this.texCoords = new Float32Array(vertexCount * 2);

        const alphaAng = 2 * Math.PI / this.slices;
        let vertexIndex = 0;
        let indexIndex = 0;

        for (let i = 0; i <= this.slices; i++) {
            let angle = alphaAng * i;
            let x = this.radius * Math.cos(angle);
            let y = this.radius * Math.sin(angle);
            let zIncrement = this.height / this.stacks;

            for (let j = 0; j <= this.stacks; j++) {
                let zIndex = j * zIncrement;
                this.vertices[vertexIndex] = x;
                this.vertices[vertexIndex + 1] = y;
                this.vertices[vertexIndex + 2] = zIndex;
                this.normals[vertexIndex] = x;
                this.normals[vertexIndex + 1] = y;
                this.normals[vertexIndex + 2] = 0;
                this.texCoords[j * 2] = i / this.slices;
                this.texCoords[j * 2 + 1] = j / this.stacks;
                vertexIndex += 3;

                if (i < this.slices && j < this.stacks) {
                    let a = i * (this.stacks + 1) + j;
                    let b = a + this.stacks + 1;
                    this.indices[indexIndex++] = a;
                    this.indices[indexIndex++] = b;
                    this.indices[indexIndex++] = a + 1;
                    this.indices[indexIndex++] = a + 1;
                    this.indices[indexIndex++] = b;
                    this.indices[indexIndex++] = b + 1;
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); // Complexity varies 0-1, slices vary 3-12
        this.initBuffers();
    }
}
