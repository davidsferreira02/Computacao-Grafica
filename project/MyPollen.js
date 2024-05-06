import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        this.x = x;
        this.y = y;
        this.z = z;
        this.sphere = new MySphere(scene, 1, 10, 10);

        this.scaleFactors = [0.5, 1, 0.5]; // X, Y, Z

        // Adicione aqui o material e a textura para o pólen
        this.material = new CGFappearance(scene);
        this.texture = new CGFtexture(scene, 'textures/pollen_texture.jpg');
        this.material.setTexture(this.texture);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setShininess(10.0);
        [this.a, this.b, this.c] = this.randomRotation();
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();

        // Aplicar os fatores de escala
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.a, 1, 0 ,0);
        this.scene.rotate(this.b, 0, 1 ,0);
        this.scene.rotate(this.c, 0, 0 ,1);
        this.scene.scale(this.scaleFactors[0], this.scaleFactors[1], this.scaleFactors[2]);

        this.sphere.display();

        this.scene.popMatrix();
    }

    randomRotation() {
        // Gerar ângulos aleatórios para a rotação em torno dos eixos X, Y e Z
        return [Math.PI /(Math.random()*10), Math.PI /(Math.random()*10), Math.PI/(Math.random()*10)];
    }
}
