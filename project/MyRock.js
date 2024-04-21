import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MyRock extends CGFobject {
  constructor(scene, radius, slices, stacks, prob) {
      super(scene);
      this.radius = radius;
      this.stacks = stacks; // vertical
      this.slices = slices; // horizontal
      this.prob = prob; 


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

            if(this.prob >= 0.66){
                var x =  this.radius * 2 * Math.cos(theta) * Math.sin(alpha);
                var y =  this.radius / 2 * Math.cos(alpha);
                var z =  this.radius * Math.sin(-theta) * Math.sin(alpha);
            }
            else if(this.prob >= 0.33){
                var x =  this.radius * Math.cos(theta) * Math.sin(alpha);
                var y =  this.radius * 2 * Math.cos(alpha);
                var z =  this.radius / 2 * Math.sin(-theta) * Math.sin(alpha);
            }
            else{

                var x =  this.radius / 2 * Math.cos(theta) * Math.sin(alpha);
                var y =  this.radius * Math.cos(alpha);
                var z =  this.radius * 2 * Math.sin(-theta) * Math.sin(alpha);
            }
              var noise = Math.random() * this.prob; // Adjust the level of irregularity
              var dx = noise * Math.cos(theta) * Math.sin(alpha);
              var dy = noise * Math.cos(alpha);
              var dz =  noise * Math.sin(-theta) * Math.sin(alpha);

              if(noise > 0.8){
                y -= dy * 0.4;
                z += dz* 0.7;
              }
              else if(noise > 0.5){
                x += dx * 0.2;
                z -= dz * 0.5;
              }
              else if(noise > 0.3){
                x -= dx * 0.6;
                y += dy * 0.3;
              }
              else{
                x += dz * 0.8;
                y += dy * 0.4;
                z += dz * 0.6;
              }

            
              this.vertices.push(x, y, z);
              this.normals.push(x, y, z); 

              this.vertices.unshift(x, y, z);
              this.normals.unshift(x, y, z);
        

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
