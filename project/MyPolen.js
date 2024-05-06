import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

export class MyPollen extends CGFobject {
    constructor(scene) {
        super(scene);

        this.sphere = new MySphere(scene, 1, 10, 10);

        // Defina aqui os fatores de escala para tornar um hemisfério mais "alongado"
        this.scaleFactors = [1, 1.5, 1]; // X, Y, Z

        // Adicione aqui o material e a textura para o pólen
        this.material = new CGFappearance(scene);
        this.texture = new CGFtexture(scene, 'textures/pollen_texture.jpg');
        this.material.setTexture(this.texture);
        this.material.setAmbient(1, 1, 1, 1);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setShininess(10.0);

        // Aplique uma rotação aleatória
        this.randomRotation();
    }

    display() {
        this.material.apply();
        this.scene.pushMatrix();
        
        // Aplicar os fatores de escala
        this.scene.scale(this.scaleFactors[0], this.scaleFactors[1], this.scaleFactors[2]);
        
        // Desenhar o hemisfério superior
        this.sphere.display();

        // Desenhar o hemisfério inferior (invertido)
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.sphere.display();

        this.scene.popMatrix();
    }

    randomRotation() {
        // Gerar ângulos aleatórios para a rotação em torno dos eixos X, Y e Z
        const angleX = Math.random() * 2 * Math.PI;
        const angleY = Math.random() * 2 * Math.PI;
        const angleZ = Math.random() * 2 * Math.PI;

        // Aplicar as rotações aleatórias
        this.scene.rotate(angleX, 1, 0, 0);
        this.scene.rotate(angleY, 0, 1, 0);
        this.scene.rotate(angleZ, 0, 0, 1);
    }
}
