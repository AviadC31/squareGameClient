import { WindowRefService } from './services/window-ref.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EngineComponent } from './engine/engine.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'SquareGame'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    WindowRefService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }