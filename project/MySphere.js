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
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];

      var alpha = 0; // angulo vertical 
      var theta = 0; // angulo com a horizontal
      var latVert = this.slices + 1; // vertices em largura vai ter que ter sempre um a mais

      for (let i = 0; i <= this.stacks; i++) { // altura 
          theta = 0;
          for (let j = 0; j <= this.slices; j++) { // largura 
              var x =  this.radius * Math.cos(theta) * Math.sin(alpha);
              var y =  this.radius * Math.cos(alpha);
              var z =  this.radius * Math.sin(-theta) * Math.sin(alpha);

              if (this.inverted) {
                // Reverse order of vertices and normals if inverted
                this.vertices.unshift(x, y, z);
                this.normals.unshift(-x, -y, -z); // Negate normals for inverted sphere
              } else {
                  this.vertices.push(x, y, z);
                  this.normals.push(x, y, z); // Keep normals unchanged for non-inverted sphere
              }

              if (i < this.stacks && j < this.slices) {
                  var first = i * latVert + j;
                  var second = first + latVert;

                  if (this.inverted) {
                      // Reverse order of indices if inverted
                      this.indices.push(first + 1, second, first);
                      this.indices.push(first + 1, second + 1, second);
                  } else {
                      this.indices.push(first + 1, first, second);
                      this.indices.push(first + 1, second, second + 1);
                  }
              }

              // Modify texture coordinates to invert V coordinate if inverted
              if (this.inverted) {
                  this.texCoords.push(j / this.slices, 1 - (i / this.stacks));
              } else {
                  this.texCoords.push(j / this.slices, i / this.stacks);
              }

              theta += (2 * Math.PI) / this.slices;
          }
          alpha += Math.PI / this.stacks;
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}
