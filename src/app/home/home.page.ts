import { CnpjModel } from './models/cnpj.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { LoadingController, ToastController } from '@ionic/angular';
 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  url = environment.urlConsult;
  resultConsultCnpj: CnpjModel;
  constructor(
    private http: HttpClient, 
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController) {}
 
  ngOnInit(): void {
 //   throw new Error("Method not implemented.");
  }
  async onSearchChangeCnpj(cnpjNumber){ 
    const cnpj = cnpjNumber.detail.value;
    if(cnpj.length >= 14 && this.validCnpj(cnpj)){
      console.log("Cnpj", cnpj.length);
      const toast = await this.toastCtrl.create({
        message: 'Cnpj Válido',
        cssClass: 'validCnpj',
        position: 'bottom',
        duration: 1000,
        mode: 'ios',
      })
      toast.present();
    }else if(cnpj.length >= 14 && !this.validCnpj(cnpj)) {
      const toast2 = await this.toastCtrl.create({
        message: 'Cnpj Inválido',
        cssClass: 'invalidCnpj',
        position: 'bottom',
        duration: 3000,
        mode: 'ios',
        buttons: [{text: 'Fechar'}]
      })
      toast2.present();
      return this.resultConsultCnpj = null
    }
    try {
      if(cnpj.length >= 14 && this.validCnpj(cnpj)){   
        const replaceCnpj = cnpj.replace(/[^0-9]/g, '');
        console.log("Cnpj Filtrado para consulta", replaceCnpj);
        const load = await    this.loadCtrl.create({
          message: 'Fazendo consulta...' + cnpj,
          spinner: 'bubbles'
        })
        load.present();
        this.consultCnpj(replaceCnpj).subscribe( (res: any) => {
          console.log(res) 
          if(res ){
            this.resultConsultCnpj = res;
           //load.dismiss();
          } 
        }, err => console.log(err))
        } else {
          return this.resultConsultCnpj = null
        }
    } catch (error) {
      console.log("Erro > ", error)
    } finally {
      setTimeout(() => {
        this.loadCtrl.dismiss();
      }, 1000)
     
    }
    

  }

  consultCnpj(cnpjFiltrado): Observable<CnpjModel[]> {
    return this.http.get<CnpjModel[]>(`${this.url}${cnpjFiltrado}`);
  }
   validCnpj(cnpj) {
    if (
      !cnpj ||
      cnpj.length != 14 ||
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;
    return true;
  }
  
}
