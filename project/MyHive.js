import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyElipsoid } from './MyEllipsoid.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHive extends CGFobject {
	constructor(scene) {
		super(scene);
            this.initMaterials();
		this.initBuffers();
            this.entry = new MyElipsoid(scene, 20,2,2);
	}
	
      initMaterials() {
            // Crie um novo material com uma textura de madeira
            this.hiveMaterial = new CGFappearance(this.scene);
            this.hiveMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.hiveMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
            this.hiveMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.hiveMaterial.setShininess(10.0);
            this.hiveMaterial.loadTexture('textures/hive.jpg');
            this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');

            this.roofMaterial = new CGFappearance(this.scene);
            this.roofMaterial.setAmbient(0.5, 0.5, 0.5, 1);
            this.roofMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
            this.roofMaterial.setSpecular(0.1, 0.1, 0.1, 1);
            this.roofMaterial.setShininess(10.0);
            this.roofMaterial.loadTexture('textures/eye.jpg');
            this.roofMaterial.setTextureWrap('REPEAT', 'REPEAT');
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


            this.texCoords = [
            0, 1, // V0
            1, 1, // V1
            0, 0, // V2
            1, 0, // V3

            // Face traseira
            0, 1, // V4
            1, 1, // V5
            0, 0, // V6
            1, 0, // V7

            // Face superior
            0, 1, // V2
            1, 1, // V3
            0, 0, // V6
            1, 0, // V7

            // Face inferior
            0, 1, // V0
            1, 1, // V1
            0, 0, // V4
            1, 0, // V5

            // Face lateral esquerda
            0, 1, // V2
            1, 1, // V0
            0, 0, // V6
            1, 0, // V4

            // Face lateral direita
            0, 1, // V3
            1, 1, // V1
            0, 0, // V7
            1, 0, // V5
            ]

            //The defined indices (and corresponding vertices)
            //will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

      display() {
            this.scene.pushMatrix();
            this.hiveMaterial.apply(); 
            this.scene.translate(-30, -87, -30);
            this.scene.scale(25,25,25);
            super.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.roofMaterial.apply();
            this.scene.translate(-30, -73, -30);
            this.scene.scale(27,5,27);
            super.display();
            this.scene.popMatrix();


            this.scene.pushMatrix();
            this.scene.translate(-30, -83, -17.4);
            this.entry.display();
            this.scene.popMatrix();
      }
}

