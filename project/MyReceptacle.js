import { CGFobject } from '../lib/CGF.js';

/**
 * MyReceptacle
 * 
 * @constructor
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, slices, stacks, radius) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;
        this.radius = radius;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];
        this.normals = [];

        // Set up the vertices, indices, and texture coordinates
        for (let lat = 0; lat <= this.latDivs; ++lat) {
            const theta = lat * Math.PI / this.latDivs;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let long = 0; long <= this.longDivs; ++long) {
                const phi = long * 2 * Math.PI / this.longDivs;
                const cosPhi = Math.cos(phi);
                const sinPhi = Math.sin(phi);

                const x = this.radius * sinTheta * cosPhi;
                const y = this.radius * cosTheta;
                const z = 0;
                const u = 1 - (long / this.longDivs);
                const v = 1 - (lat / this.latDivs); // Adjusted v coordinate

                this.vertices.push(x, y, z);
                this.texCoords.push(u, v);
                this.normals.push(sinTheta * cosPhi, cosTheta, sinTheta * sinPhi);
            }
        }

        for (let lat = 0; lat < this.latDivs; ++lat) {
            for (let long = 0; long < this.longDivs; ++long) {
                const first = (lat * (this.longDivs + 1)) + long;
                const second = first + this.longDivs + 1;

                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
