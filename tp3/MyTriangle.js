import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			-1,-1,0,
			1,-1,0,
			-1,1,0,
			-1,-1,0,
			1,-1,0,
			-1,1,0,
			

		];

		this.indices = [
			0, 1, 2, 
			1, 2, 0,
			5, 4, 3, 

		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, -1, 0,
			0, 1, 0,
			0, -1, 0 
		]
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
