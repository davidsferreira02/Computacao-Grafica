import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';
import { MyPollen } from './MyPollen.js';

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.position=[0,0,0];
        this.hive = new MyUnitCube(scene);
        this.polen = new MyPollen(this.scene, 0.5, 100, 100, [ this.position[0] + 2, this.position[1]-2, this.position[2]]);
        this.number = 0;
        this.hasPollen = false;


        this.texturePollen = new CGFtexture(this.scene,"textures/pollen.jpg");

        this.appearancePollen= new CGFappearance(this.scene);
        this.appearancePollen.setAmbient(1, 1, 1, 1);
        this.appearancePollen.setDiffuse(1, 1, 1, 1);
        this.appearancePollen.setSpecular(1, 1, 1, 1);
        this.appearancePollen.setTexture(this.texturePollen);
        this.appearancePollen.setTextureWrap('REPEAT', 'REPEAT');
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    getPosition() {
        return this.position;
    }

    addPollen(){
        this.hasPollen = true;
        this.number = this.number + 1;
        console.log("Pollen added to hive at position", this.position);
    }

    display(){
        this.setPosition(-90/3,-24/3,-62/3);
        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.hive.display();
        this.scene.popMatrix();
        
        let a = this.number;
        for (let i = 0; i < this.scene.garden.numRows; i++) {
            for (let j = 0; j < this.scene.garden.numColumns; j++) {
                if (a != 0) {
                    console.log("hive");
                    this.createPollen(i,j);
                    a--;
                }
                else break;
            }
        }
    }

    createPollen(i, j) {
        const x = i * 1.7; 
        const z = -j * 1.7; 
        this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
        this.scene.translate(-85 + x, -37, -57 + z);
        this.appearancePollen.apply();
        this.polen.display();
        this.scene.popMatrix();
    }
}
