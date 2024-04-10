import {CGFobject} from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */ 

export class MySphere extends CGFobject {
	constructor(scene, radius, slices, stacks, inverted) {
		super(scene);
        this.scene = scene;
		this.radius = radius;
        this.stacks = stacks; // vertical
        this.slices = slices; // horizontal
        this.inverted = inverted; // flag to indicate if the sphere should be inverted
		this.initBuffers();
	}

    initBuffers(){
        this.receptacle = MySphere(this.scene, this.radius, this.stacks, this.slices, this.inverted);
        this.receptacle.display();
    }

}