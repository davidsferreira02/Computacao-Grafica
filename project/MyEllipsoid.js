import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MyElipsoid extends CGFobject {
  constructor(scene, radius, slices, stacks) {
      super(scene);
      this.radius = radius;
      this.stacks = stacks; // vertical
      this.slices = slices; // horizontal
     

      this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var alpha = 0; // ângulo vertical
    var theta = 0; // ângulo horizontal
    var latVert = this.slices + 1;

    for (let i = 0; i <= this.stacks; i++) {
        theta = 0;
        for (let j = 0; j <= this.slices; j++) {
            var x = this.radius/2 * Math.cos(theta) * Math.sin(alpha);
            var y = this.radius/4 * Math.cos(alpha);
            var z = this.radius/4 * Math.sin(-theta) * Math.sin(alpha);

            this.vertices.push(x, y, z);

            // Calcular e normalizar as normais
            var nx = x / Math.pow(this.radius/2, 2);
            var ny = y / Math.pow(this.radius/4, 2);
            var nz = z / Math.pow(this.radius/4, 2);
            var length = Math.sqrt(nx*nx + ny*ny + nz*nz);
            this.normals.push(nx / length, ny / length, nz / length);

            if (i < this.stacks && j < this.slices) {
                var first = i * latVert + j;
                var second = first + latVert;

                this.indices.push(first + 1, first, second);
                this.indices.push(first + 1, second, second + 1);
            }

            this.texCoords.push(j / this.slices, i / this.stacks);

            theta += (2 * Math.PI) / this.slices;
        }
        alpha += Math.PI / this.stacks;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}

}
