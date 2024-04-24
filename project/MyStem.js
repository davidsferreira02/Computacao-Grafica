
import {CGFobject} from '../lib/CGF.js';
/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MyStem extends CGFobject {
	constructor(scene, slices, stacks,radius,height) {
		super(scene);
		this.slices = slices; 
		this.stacks = stacks;
        this.radius=radius;
        this.height=height; 
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

    
        var alphaAng = 2*Math.PI/this.slices;
		
        

        for(var i = 0; i <=this.slices; i++){

            var x=this.radius*Math.cos(alphaAng*i);
            var y=this.radius*Math.sin(alphaAng*i);
            var z = this.height/this.stacks;

			for (var j = 0; j <=this.stacks; j++){
				var k = z * j;
				this.vertices.push(x, y, k);
                
                var u = i / this.slices;
                var v = j / this.stacks;
                this.texCoords.push(u, v);
			}
        }
            
      for(var i=0;i<this.slices;i++){
        for(var j=0;j<this.stacks;j++){
            this.indices.push(i*(this.stacks+1)+j,i*(this.stacks+1)+1+this.stacks+j,i*(this.stacks+1)+2+this.stacks+j);
            this.indices.push(i*(this.stacks+1)+j,i*(this.stacks+1)+2+this.stacks+j,i*(this.stacks+1)+1+j);
             this.indices.push(i*(this.stacks+1)+2+this.stacks+j,i*(this.stacks+1)+1+this.stacks+j,i*(this.stacks+1)+j);
             this.indices.push(i*(this.stacks+1)+1+j,i*(this.stacks+1)+2+this.stacks+j,i*(this.stacks+1)+j);

        }
      }

      for(var i=0;i<=this.slices;i++){
            var x=this.radius*Math.cos(alphaAng*i);
            var y=this.radius*Math.sin(alphaAng*i);
            for(var j=0;j<=this.stacks;j++){
               this.normals.push(x, y, 0);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
