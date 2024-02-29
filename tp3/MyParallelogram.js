import { CGFobject } from '../lib/CGF.js';

/**
 * MyParrallelogram
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0, 0, 0,
			2, 0, 0,
			3, 1, 0,
			1, 1, 0,
			0, 0, 0,
			2, 0, 0,
			3, 1, 0,
			1, 1, 0
		];

		this.indices = [
			0, 1, 2,
			2, 3, 0,
			6, 5, 4,
			7, 6, 4
		];
			
		this.normals = [
			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1, 
			0, 0, -1, 
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1, 
			0, 0, 1, 
		];
		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}


