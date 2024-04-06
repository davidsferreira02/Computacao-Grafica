
import { MySphere } from './MySphere.js';
import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture,CGFobject } from "../lib/CGF.js";

/**
 * MyPanorama
 * 
 * @constructor
 */
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.sphere= new MySphere(scene,200,200,true);
    }

    display(){
        this.scene.pushMatrix();
        this.appearance.apply();
       this.scene.scale(200,200,200);
        this.sphere.display();
        this.scene.popMatrix();

    }
 
}
