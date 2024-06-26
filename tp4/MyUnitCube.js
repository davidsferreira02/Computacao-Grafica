import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,   //7
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,  //7
            -0.5, -0.5, 0.5,  //0
            0.5, -0.5, 0.5,   //1
            -0.5, 0.5, 0.5,   //2
            0.5, 0.5, 0.5,    //3
            -0.5, -0.5, -0.5, //4
            0.5, -0.5, -0.5,  //5
            -0.5, 0.5, -0.5,  //6
            0.5, 0.5, -0.5,  //7

		];

            

		this.indices = [

            0, 1, 2, 
            3, 2, 1, 
            6, 5, 4,
            5, 6, 7, 
            1, 5, 3,
            7, 3, 5, 
            2, 4, 0,
            4, 2, 6, 
            2, 3, 7,
            6, 2, 7,
            5, 1, 0,
            5, 0, 4, 

		    
		];

            this.normals = [
                  0,0,1, //trás cima
                  0,0,1, //direita cima
                  0,0,1, //esquerda cima
                  0,0,1, //frente cima
                  0,0,-1, //trás baixo
                  0,0,-1, //direita baixo
                  0,0,-1, //esquerda baixo
                  0,0,-1, //frente baixo
                  0,-1,0,
                  0,-1,0,
                  0,1,0,
                  0,1,0,
                  0,-1,0,
                  0,-1,0,
                  0,1,0,
                  0,1,0,
                  -1,0,0,
                  1,0,0,
                  -1,0,0,
                  1,0,0,
                  -1,0,0,
                  1,0,0,
                  -1,0,0,
                  1,0,0,
            
            ]

            
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

