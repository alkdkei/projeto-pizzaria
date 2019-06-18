import { Component, OnInit } from '@angular/core';
import { Loja } from './loja';
import { LojaService } from './loja.service';
import { AlertController, Platform } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  MyLocation,
  
} from '@ionic-native/google-maps';
//Importar suporte para plataforma




@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})
export class LojaPage implements OnInit {
  private loja: Loja;
  map: GoogleMap;

  constructor(
    private lojaService: LojaService,
    public alertController: AlertController,
    private platform: Platform
  ) { }

  async ngOnInit() {
  
    this.loja = new Loja;
  
      await this.platform.ready();
      await this.loadMap();
  }
  onSubmit(form) {
    this.lojaService.save(this.loja)
      .then(
        res => {
          console.log("Cadastrado");
          this.presentAlert("Aviso!", "Loja cadastrada.");
        }
        ,
        err => {
          console.log("Epá! Não foi cadastrado!" + err);
          this.presentAlert("Erro!", "Epá! Não foi cadastrado!");
        }
      ).catch(
        erros => {
          console.log("Erro ao conectar no sistema! " + erros);
          this.presentAlert("Erro!", "Erro ao conectar no sistema!");
        }
      )
  }

    async presentAlert(titulo: string, texto: string) {
      const alert = await this.alertController.create({
        header: titulo,
        // subHeader: 'Subtitle',
        message: texto,
        buttons: ['OK']
      });
      await alert.present();
    }
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 21.382314,
          lng: -157.933097
        },
        zoom: 15
      }
    });
    this.localAtual();
  }

  localAtual(){
    this.map.clear;
    this.map.getMyLocation()
      .then(
        (location: MyLocation) => {
          this.map.animateCamera({
            target: location.latLng,
           // zoom: 18,
          });
          this.map.addMarker({
            title: this.loja.nome,
            snippet: this.loja.endereco,
            icon: '#dd0000',
            animation: 'bouce',
            zoom: 18,
            position: location.latLng
          })
          this.loja.lat = location.latLng.lat;
          this.loja.lng = location.latLng.lng;
        })
      
  }
}