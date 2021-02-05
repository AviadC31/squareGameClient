import { WindowRefService } from './../services/window-ref.service';
import { ElementRef, Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { io } from 'socket.io-client';
import {environment} from '../../environments/environment';

import {
  Engine,
  ArcRotateCamera,
  Scene,
  Light,
  Mesh,
  Color3,
  Color4,
  Vector3,
  HemisphericLight,
  StandardMaterial,
  MeshBuilder
} from 'babylonjs';
import 'babylonjs-materials';

@Injectable({ providedIn: 'root' })
export class EngineService {
  private canvas: HTMLCanvasElement;
  private engine: Engine;
  private camera: ArcRotateCamera;
  private scene: Scene;
  private light: Light;
  private box1: Mesh;
  private box2: Mesh;
  private box3: Mesh;
  private box4: Mesh;
  private box5: Mesh;
  private box6: Mesh;
  private box7: Mesh;
  private box8: Mesh;
  private box9: Mesh;
  private colors: Observable<any> | any;
  public socket;

  public constructor(
    private ngZone: NgZone,
    private windowRef: WindowRefService,
    public firestore: AngularFirestore
  ) {
    this.colors = firestore.collection('colors').valueChanges()
    .subscribe(colors => {
      this.colors = colors;
    })
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {

  
    this.canvas = canvas.nativeElement;

    this.engine = new Engine(this.canvas,  true);

    this.scene = new Scene(this.engine);

    this.scene.clearColor = new Color4(0, 0, 0, 0);

    this.camera = new ArcRotateCamera('camera',  -Math.PI / 2, Math.PI / 2.5, 2.5, new Vector3(0.1, 0.2, 0.6), this.scene);

    this.camera.setTarget(Vector3.Zero());

    this.camera.attachControl(this.canvas, false);

    this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);

    this.socket.on('colors', colors =>{
      
      this.box1 = MeshBuilder.CreateBox('box1',{width:0.49,height:0.05,depth:0.49},this.scene);
      this.box1.material = new StandardMaterial("myMaterial", this.scene);
      this.box1.position =  new Vector3(-0.5, 0, 0);
      this.box1.material['diffuseColor'] = new Color3(colors.box1[0], colors.box1[1], colors.box1[2]);
      
      this.box2 = MeshBuilder.CreateBox('box2', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box2.material = new StandardMaterial("myMaterial", this.scene);
      this.box2.position =  new Vector3(0, 0, 0);
      this.box2.material['diffuseColor'] = new Color3(colors.box2[0], colors.box2[1], colors.box2[2]);
      
      this.box3 = MeshBuilder.CreateBox('box3', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box3.material = new StandardMaterial("myMaterial", this.scene);
      this.box3.position =  new Vector3(0.5, 0, 0);
      this.box3.material['diffuseColor'] = new Color3(colors.box3[0], colors.box3[1], colors.box3[2]);
      
      this.box4 = MeshBuilder.CreateBox('box4', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box4.material = new StandardMaterial("myMaterial", this.scene);
      this.box4.position =  new Vector3(-0.5, 0, 0.5);
      this.box4.material['diffuseColor'] = new Color3(colors.box4[0], colors.box4[1], colors.box4[2]);
      
      this.box5 = MeshBuilder.CreateBox('box5', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box5.material = new StandardMaterial("myMaterial", this.scene);
      this.box5.position =  new Vector3(0, 0, 0.5);
      this.box5.material['diffuseColor'] = new Color3(colors.box5[0], colors.box5[1], colors.box5[2]);
      
      this.box6 = MeshBuilder.CreateBox('box6', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box6.material = new StandardMaterial("myMaterial", this.scene);
      this.box6.position =  new Vector3(0.5, 0, 0.5);
      this.box6.material['diffuseColor'] = new Color3(colors.box6[0], colors.box6[1], colors.box6[2]);
      
      this.box7 = MeshBuilder.CreateBox('box7', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box7.material = new StandardMaterial("myMaterial", this.scene);
      this.box7.position =  new Vector3(-0.5, 0, 1);
      this.box7.material['diffuseColor'] = new Color3(colors.box7[0], colors.box7[1], colors.box7[2]);
      
      this.box8 = MeshBuilder.CreateBox('box8', {width:0.49,height:0.05,depth:0.49} , this.scene);
      this.box8.material = new StandardMaterial("myMaterial", this.scene);
      this.box8.position =  new Vector3(0, 0, 1);
      this.box8.material['diffuseColor'] = new Color3(colors.box8[0], colors.box8[1], colors.box8[2]);
      
      this.box9 = MeshBuilder.CreateBox('box9', {width:0.49,height:0.05,depth:0.49}, this.scene);
      this.box9.material = new StandardMaterial("myMaterial", this.scene);
      this.box9.position =  new Vector3(0.5, 0, 1);
      this.box9.material['diffuseColor'] = new Color3(colors.box9[0], colors.box9[1], colors.box9[2]);

    })
    }

  public animate(): void {

    this.ngZone.runOutsideAngular(() => {
      const rendererLoopCallback = () => {
        this.scene.render();
      };

      if (this.windowRef.document.readyState !== 'loading') {
        this.engine.runRenderLoop(rendererLoopCallback);
      } else {
        this.windowRef.window.addEventListener('DOMContentLoaded', () => {
          this.engine.runRenderLoop(rendererLoopCallback);
        });
      }

      this.windowRef.window.addEventListener('resize', () => {
        this.engine.resize();
      });
      this.canvas.addEventListener('click', () => {
        const result = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
        const currentBox = result.pickedMesh
        if (result.hit) {
        this.socket.emit("color", {
                                    boxNum: currentBox.id,
                                    color1: Math.random(),
                                    color2: Math.random(),
                                    color3: Math.random()
                                   }
                        );
        currentBox.position = new Vector3(currentBox.position.x, -0.01, currentBox.position.z); 
        currentBox.scaling = new Vector3(1,0.6,1)
        setTimeout(function(){
          currentBox.scaling = new Vector3(1,1,1)
          currentBox.position = new Vector3(currentBox.position.x, 0, currentBox.position.z); 
        },100);
        }   
         })
    });
    this.socket.on("newColor",(color)=>{
      this[`${color.boxNum}`].material['diffuseColor'] = new Color3(color.color1, color.color2, color.color3);
    })
  }
  
}

