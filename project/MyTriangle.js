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
			-halfBase, -halfHeight, 0, // V0
			halfBase, -halfHeight, 0, // V1
			0, halfHeight, 0, // V2
		];

		this.indices = [
			0, 1, 2, // Face frontal
		];

		// Calculando os vetores normais
		const normal = [0, 0, 1]; // Normais para a face frontal

		this.normals = [
			...normal,
			...normal,
			...normal,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
