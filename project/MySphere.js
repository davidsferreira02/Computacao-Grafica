import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * 
 * @constructor
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks) {
        super(scene);
        this.stacks = stacks; // vertical
        this.slices = slices; // horizontal
    
        this.initBuffers();
      }
    
      initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    
        var alpha = 0; // angulo vertical 
        var theta = 0; // angulo com a horizontal
        var latVert = this.slices +1 ; // vertices em largura vai ter que ter sempre um a mais
    
      
        for (let i = 0; i <= this.stacks; i++) { // altura 
          theta = 0;
          for (let j = 0; j <= this.slices; j++) { // largura 
          
            var x = Math.cos(theta) * Math.sin(alpha);
            var y = Math.cos(alpha);
            var z = Math.sin(-theta) * Math.sin(alpha);
            this.vertices.push(x, y, z);
    
         
            if (i < this.stacks && j < this.slices) {
              var first = i * latVert + j;
              var second = first + latVert;
    
          
                this.indices.push(first + 1, first, second);
                this.indices.push(first + 1, second, second + 1);
            }
    
              this.normals.push(x, y, z);
          
            theta += (2 * Math.PI) / this.slices; // 2PI pois ele faz uma volta 360 
         
          }
          alpha += Math.PI / this.stacks; // Pi pois ele faz uma volta de apenas de 180 
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
      }
    }
    