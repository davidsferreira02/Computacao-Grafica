import { CGFobject } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.hive = new MyUnitCube(scene);
        this.position=[0,0,0];  // Posição padrão da colmeia
        this.initBuffers();
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    getPosition() {
        // Simplesmente retorna a posição sem logar aqui
        //console.log("This hive has ",this.position);
        return this.position;
    }

    addPollen(pollen){
        // Agora, logar fora de getPosition se necessário
        console.log("Pollen added to hive at position", this.position);
    }

    display(){
        this.setPosition(-92,-41,-66);
        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.hive.display();
        this.scene.popMatrix();
    }
}
