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
			    0,0,0,
                2,0,0,
                3,1,0,
                1,1,0
				];

		this.indices = [
				0, 1, 3, 
				1, 2, 0,
                2,3,1,
                3,0,2,
                3,1,0,
                0,2,1,
                1,3,2,
                2,0,3,
			];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}


