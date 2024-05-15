import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MySphere extends CGFobject {
  constructor(scene, radius, slices, stacks, inverted) {
      super(scene);
      this.radius = radius;
      this.stacks = stacks; // vertical
      this.slices = slices; // horizontal
      this.inverted = inverted; // flag to indicate if the sphere should be inverted

      this.initBuffers();
  }

  
  initBuffers() {
    const vertexCount = (this.slices + 1) * (this.stacks + 1);
    this.vertices = new Float32Array(vertexCount * 3);
    this.indices = new Uint16Array(this.stacks * this.slices * 6);
    this.normals = new Float32Array(vertexCount * 3);
    this.texCoords = new Float32Array(vertexCount * 2);

    let alpha = 0; // vertical angle
    const deltaAlpha = Math.PI / this.stacks;
    const deltaTheta = 2 * Math.PI / this.slices;

    for (let i = 0, index = 0; i <= this.stacks; i++, alpha += deltaAlpha) {
        let theta = 0;
        for (let j = 0; j <= this.slices; j++, theta += deltaTheta, index += 3) {
            let cosAlpha = Math.cos(alpha);
            let sinAlpha = Math.sin(alpha);
            let cosTheta = Math.cos(theta);
            let sinTheta = Math.sin(theta);

            let x = this.radius * cosTheta * sinAlpha;
            let y = this.radius * cosAlpha;
            let z = this.radius * sinTheta * sinAlpha;
            
            let normalDirection = this.inverted ? -1 : 1;
            this.vertices[index] = x;
            this.vertices[index + 1] = y;
            this.vertices[index + 2] = z;
            this.normals[index] = normalDirection * x;
            this.normals[index + 1] = normalDirection * y;
            this.normals[index + 2] = normalDirection * z;

            this.texCoords[index / 3 * 2] = j / this.slices;
            this.texCoords[index / 3 * 2 + 1] = this.inverted ? i / this.stacks : 1 - (i / this.stacks);

            if (i < this.stacks && j < this.slices) {
                let base = i * (this.slices + 1) + j;
                let indicesBase = i * this.slices * 6 + j * 6;
                if (this.inverted) {
                    this.indices[indicesBase] = base;
                    this.indices[indicesBase + 1] = base + this.slices + 2;
                    this.indices[indicesBase + 2] = base + this.slices + 1;
                    this.indices[indicesBase + 3] = base;
                    this.indices[indicesBase + 4] = base + 1;
                    this.indices[indicesBase + 5] = base + this.slices + 2;
                } else {
                    this.indices[indicesBase] = base;
                    this.indices[indicesBase + 1] = base + 1;
                    this.indices[indicesBase + 2] = base + this.slices + 1;
                    this.indices[indicesBase + 3] = base + 1;
                    this.indices[indicesBase + 4] = base + this.slices + 2;
                    this.indices[indicesBase + 5] = base + this.slices + 1;
                }
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
}