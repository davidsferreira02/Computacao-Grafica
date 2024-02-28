import {CGFobject} from '../lib/CGF.js';
/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, 0, 0,	//1
			0, 0, 0,	//2
			0, 1, 0,	//3
			-1, 1, 0,	//0
			-1, 0, 0,	//1
			0, 0, 0,	//2
			0, 1, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 3,
			1, 2, 3,
			7, 5, 4,
			7, 6, 5
		];

		this.normals = [
            0, 0, 1,   
            0, 0, 1,   
            0, 0, 1,   
            0, 0, 1,   
            -1, 0, 0,  
            -1, 0, 0,  
            1, 0, 0,   
            1, 0, 0, 
			
        ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

