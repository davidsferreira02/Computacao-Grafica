import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends MySphere {
    constructor(scene, radius, stacks, slices,position) {
        super(scene, radius, stacks, slices);
        this.position = position || [-0.8, 0, -0.8];  // Posição padrão se nenhuma for fornecida
    }


    setPosition(x,y,z){
        this.position[0]=x;
        this.position[1]=y;
        this.position[2]=z;
        console.log("Position to myPollen" ,this.position);
    }

    display() {
        this.scene.pushMatrix();
        super.display();  // Chama o display da esfera
        this.scene.popMatrix();
    }
}
