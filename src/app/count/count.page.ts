import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Participant } from '../participant';

@Component({
  selector: 'app-count',
  templateUrl: './count.page.html',
  styleUrls: ['./count.page.scss'],
})
export class CountPage implements OnInit {

  private _participant_1: Participant;
  private _participant_2: Participant;

  constructor(public alertController: AlertController,
    public router: Router) {
    const nav = this.router.getCurrentNavigation();
    this._participant_1 = new Participant();
    this._participant_2 = new Participant();
    this._participant_1.name = nav.extras.state.name_group_1;
    this._participant_2.name = nav.extras.state.name_group_2;
  }

  ngOnInit() {

  }

  async presentAlert(titulo: string, subtitulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: [
        {
          text: 'Início',
          handler: () => {
            this.router.navigate(["/home"]);
          }
        }
      ]
    });

    await alert.present();
  }

  public changePoints(value: string, participant: Participant) {
    let points = eval(participant.points.toString() + value);
    if((value == '0') || (points < 0)){
      participant.points = 0;
      return;
    }

    if(points >= 12){
      this.presentAlert('Contador de Truco', 'Fim de jogo!', `Equipe ${participant.name} venceu a partida.`)
    }
    participant.points = eval(points);
  }

}
