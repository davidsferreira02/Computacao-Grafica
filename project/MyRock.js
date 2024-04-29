import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MyRock extends CGFobject {
  constructor(scene, radius, slices, stacks, prob, size) {
      super(scene);
      this.radius = radius;
      this.stacks = stacks; // vertical
      this.slices = slices; // horizontal
      this.prob = prob; 
      this.size = size;


      this.initBuffers();
  }

  initBuffers() {
      this.vertices = [];
      this.indices = [];
      this.normals = [];
      this.texCoords = [];
      this.x = 0;
      this.y = 0;
      this.z = 0;

      var alpha = 0; // angulo vertical 
      var theta = 0; // angulo com a horizontal
      var latVert = this.slices + 1; // vertices em largura vai ter que ter sempre um a mais

      for (let i = 0; i <= this.stacks; i++) { // altura 
          theta = 0;
          for (let j = 0; j <= this.slices; j++) { // largura 

            if(this.prob >= 0.5){
                this.x =  this.radius * (this.size*0.5) * Math.cos(theta) * Math.sin(alpha);
                this.y =  this.radius / (this.size*0.5) * Math.cos(alpha);
                this.z =  this.radius * Math.sin(-theta) * Math.sin(alpha);
            }
          
            else{
                this.x =  this.radius / (this.size*0.5) * Math.cos(theta) * Math.sin(alpha);
                this.y =  this.radius * Math.cos(alpha);
                this.z =  this.radius * (this.size*0.5) * Math.sin(-theta) * Math.sin(alpha);
            }
              var noise = Math.random() * this.prob; 
              var dx = noise * Math.cos(theta) * Math.sin(alpha);
              var dy = noise * Math.cos(alpha);
              var dz =  noise * Math.sin(-theta) * Math.sin(alpha);

              if(noise > 0.8){
                this.y -= dy * 0.4;
                this.z += dz* 0.7;
              }
              else if(noise > 0.5){
                this.x += dx * 0.2;
                this.z -= dz * 0.5;
              }
              else if(noise > 0.3){
                this.x -= dx * 0.6;
                this.y += dy * 0.3;
              }
              else{
                this.x += dz * 0.8;
                this.y += dy * 0.4;
                this.z += dz * 0.6;
              }

            
              this.vertices.push(this.x, this.y, this.z);
              this.normals.push(this.x, this.y, this.z); 

              this.vertices.unshift(this.x, this.y, this.z);
              this.normals.unshift(this.x, this.y, this.z);
        

              if (i < this.stacks && j < this.slices) {
                  var first = i * latVert + j;
                  var second = first + latVert;

          
                  this.indices.push(first + 1, first, second);
                  this.indices.push(first + 1, second, second + 1);

                  this.indices.push(first + 1, second, first);
                  this.indices.push(first + 1, second + 1, second);
                  
              }
           
                  this.texCoords.push( -(j / this.slices), -(i / this.stacks));

              theta += (2 * Math.PI) / this.slices;
          }
          alpha += Math.PI / this.stacks;
      }

      this.primitiveType = this.scene.gl.TRIANGLES;
      this.initGLBuffers();
  }
}
