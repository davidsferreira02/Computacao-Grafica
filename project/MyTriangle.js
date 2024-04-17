import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangle extends CGFobject {
	constructor(scene, base, height) {
		super(scene);

		this.base = base;
		this.height = height;

		this.initBuffers();
	}

	initBuffers() {
		const halfBase = this.base / 2;
		const halfHeight = this.height / 2;

		this.vertices = [
			-halfBase, -halfHeight, 0, 
			halfBase, -halfHeight, 0, 
			0, halfHeight, 0, 
			-halfBase, -halfHeight, 0, 
			halfBase, -halfHeight, 0, 
			0, halfHeight, 0,
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
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			
		
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
