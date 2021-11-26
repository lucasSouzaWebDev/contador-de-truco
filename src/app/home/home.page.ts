import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private _formParticipant: FormGroup;
  private _isSubmited: boolean = false;

  constructor(public alertController: AlertController,
    public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this._formParticipant = this.formBuilder.group({
      name_group_1: ['', [Validators.required]],
      name_group_2: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this._formParticipant.controls;
  }

  public submitForm() {
    this._isSubmited = true;
    if (!this._formParticipant.valid) {
      return this.presentAlert('Agenda', 'Erro', 'Campos são obrigatórios.');
    }
    console.log(this._formParticipant.value['name_group_1']);
    this.router.navigateByUrl("/count", {
      state : {
        name_group_1: this._formParticipant.value['name_group_1'], 
        name_group_2: this._formParticipant.value['name_group_2']
      } 
    });
  }

  async presentAlert(titulo: string, subtitulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

  }

}
