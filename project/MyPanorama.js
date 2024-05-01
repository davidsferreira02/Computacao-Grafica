import { MySphere } from "./MySphere.js";

export class MyPanorama {
    constructor(scene, texture) {
        this.scene = scene;
        this.texture = texture;

        // Create an inverted sphere with a radius of 200 units
        this.sphere = new MySphere(scene, 200, 50, 50, true);
        
        // Create material with emissive component and set it for the sphere
        this.texture.setEmission(1.0, 1.0, 1.0, 1.0); // White emissive material
        this.display();
    }

    display() {
        this.texture.apply();
        this.sphere.display();
     
    }
}