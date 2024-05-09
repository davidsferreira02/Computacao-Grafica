import { CGFobject } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);

        this.hive = new MyUnitCube(scene);

        // Inicialize a geometria da colmeia
        this.initBuffers();
    }

    display(){
        this.hive.display();
    }
}
