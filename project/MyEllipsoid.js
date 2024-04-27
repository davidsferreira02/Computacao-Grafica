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

      var alpha = 0; // angulo vertical 
      var theta = 0; // angulo com a horizontal
      var latVert = this.slices + 1; // vertices em largura vai ter que ter sempre um a mais

      for (let i = 0; i <= this.stacks; i++) { // altura 
          theta = 0;
          for (let j = 0; j <= this.slices; j++) { // largura 
              var x =  this.radius/2 * Math.cos(theta) * Math.sin(alpha);
              var y =  this.radius/4 * Math.cos(alpha);
              var z =   this.radius/4 * Math.sin(-theta) * Math.sin(alpha);

       
                  this.vertices.push(x, y, z);
                  this.normals.push(x, y, z); // Keep normals unchanged for non-inverted sphere
              

              if (i < this.stacks && j < this.slices) {
                  var first = i * latVert + j;
                  var second = first + latVert;

               
                      this.indices.push(first + 1, first, second);
                      this.indices.push(first + 1, second, second + 1);
                  
              } 

              this.texCoords.push( j / this.slices, i / this.stacks);
            

              theta += (2 * Math.PI) / this.slices;
          }
          alpha += Math.PI / this.stacks;
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}
