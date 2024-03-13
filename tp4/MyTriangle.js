import { CGFobject } from '../lib/CGF.js';

/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
export class MyTriangle extends CGFobject {
	constructor(scene, number) {
		super(scene);
		this.number = number;
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
			0, 0, -1,
			0, 0, -1,
			0, 0, -1, 
		]
		if(this.number == 0){
			this.texCoords=[
				1, 0, 0,
				0.5, 0.5, 0,
				1, 1, 0
			]
		}

		if(this.number == 1){
			this.texCoords=[
				1, 0, 0,
				0.5, 0.5, 0,
				0, 0, 0
			]
		}	

		if(this.number == 2){
			this.texCoords=[
				0.5, 0.5, 0,
				0.75, 0.75, 0,
				0.25, 0.75, 0
			]
		}
		
		if(this.number == 3){
			this.texCoords=[
				0, 1, 0,
				0, 0.5, 0,
				0.5, 1, 0
			]
		}

		if(this.number == 4){
			this.texCoords=[
				0, 0, 0,
				0.25, 0.25, 0,
				0, 0.5, 0
			]
		}
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
