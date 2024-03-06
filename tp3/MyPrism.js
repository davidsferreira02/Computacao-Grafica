import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */ 
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks; 
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
		var stackLen = 1/this.stacks;
        var ang2 = ang + alphaAng/2;
        var counter = 0

        for(var i = 0; i < this.slices; i++){
            var h=Math.sin(ang);
            var p=Math.sin(ang+alphaAng);
            var m=Math.cos(ang);
            var n=Math.cos(ang+alphaAng);

			for (var t = 0; t < this.stacks; t++){
				var k = - stackLen * t;
				this.vertices.push(n, -p, k);
				this.vertices.push(m, -h, k);
				this.vertices.push(n, -p, k - stackLen);
				this.vertices.push(m, -h, k - stackLen);

                this.indices.push((counter +1), (counter +0), (counter +2) );
				this.indices.push((counter +1), (counter +2), (counter +3) );
                this.indices.push((counter +2), (counter +0), (counter +1) );
				this.indices.push((counter +3), (counter +2), (counter +1) );
                counter += 4;

                var s2 = Math.sin(ang2+2*alphaAng);
                var c2 = Math.cos(ang2+2*alphaAng);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
                this.normals.push(s2, c2, 0);
			}
            ang = ang + alphaAng;
            ang2 = ang2 + alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); 

       
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

