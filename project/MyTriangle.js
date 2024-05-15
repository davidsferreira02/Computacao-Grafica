import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene, base, height,curvature) {
        super(scene);
        this.base = base;
        this.height = height;
        this.curvature = curvature; // Curvatura adicionada para simular a folha de relva
        this.initBuffers();
    }

    initBuffers() {
        const halfBase = this.base / 2;
        const halfHeight = this.height / 2;
        const curvatureOffset = Math.random() * this.curvature - this.curvature / 2;

        // Vértices com uma leve curvatura para simular a folha de relva
        this.vertices = [
            -halfBase, -halfHeight, 0, 
            halfBase, -halfHeight, 0, 
            0, halfHeight, curvatureOffset,
            -halfBase, -halfHeight, 0, 
            halfBase, -halfHeight, 0, 
            0, halfHeight, curvatureOffset,
        ];

        this.indices = [
            0, 1, 2, 
            3, 4, 5,
        ];

        // Normais atualizadas para ambos os lados do triângulo
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        // Coordenadas de textura (se necessário)
        this.texCoords = [
            -halfBase, -halfHeight, 
            halfBase, -halfHeight, 
            0, halfHeight,
            -halfBase, -halfHeight, 
            halfBase, -halfHeight, 
            0, halfHeight,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
