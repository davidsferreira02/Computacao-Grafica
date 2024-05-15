import { CGFobject } from '../lib/CGF.js';

/**
 * MyElipsoid - Represents a 3D elipsoid in a graphics scene.
 */
export class MyElipsoid extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius;
        this.stacks = stacks;
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        const vertexCount = (this.slices + 1) * (this.stacks + 1);
        this.vertices = new Float32Array(vertexCount * 3);
        this.indices = new Uint16Array(this.stacks * this.slices * 6);
        this.normals = new Float32Array(vertexCount * 3);
        this.texCoords = new Float32Array(vertexCount * 2);

        const alphaStep = Math.PI / this.stacks;
        const thetaStep = 2 * Math.PI / this.slices;
        const rx = this.radius / 2;
        const ry = this.radius / 4;
        const rz = this.radius / 4;
        const invRx2 = 1 / (rx * rx);
        const invRy2 = 1 / (ry * ry);
        const invRz2 = 1 / (rz * rz);

        let index = 0;
        for (let i = 0, alpha = 0; i <= this.stacks; i++, alpha += alphaStep) {
            for (let j = 0, theta = 0; j <= this.slices; j++, theta += thetaStep) {
                const x = rx * Math.cos(theta) * Math.sin(alpha);
                const y = ry * Math.cos(alpha);
                const z = rz * Math.sin(-theta) * Math.sin(alpha);

                const index3 = index * 3;
                this.vertices[index3] = x;
                this.vertices[index3 + 1] = y;
                this.vertices[index3 + 2] = z;

                const nx = x * invRx2;
                const ny = y * invRy2;
                const nz = z * invRz2;
                const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
                this.normals[index3] = nx / length;
                this.normals[index3 + 1] = ny / length;
                this.normals[index3 + 2] = nz / length;

                this.texCoords[index * 2] = j / this.slices;
                this.texCoords[index * 2 + 1] = i / this.stacks;
                
                if (i < this.stacks && j < this.slices) {
                    const first = i * (this.slices + 1) + j;
                    const second = first + this.slices + 1;
                    const baseIndex = index * 6;
                    this.indices[baseIndex] = first;
                    this.indices[baseIndex + 1] = second;
                    this.indices[baseIndex + 2] = first + 1;
                    this.indices[baseIndex + 3] = first + 1;
                    this.indices[baseIndex + 4] = second;
                    this.indices[baseIndex + 5] = second + 1;
                }
                index++;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
