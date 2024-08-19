import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router'
import { AdminService } from 'src/app/services/admin.service';


declare var jQuery: any;
declare var $: any;
declare var iziToast;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = {};
  public usuario: any = {};
  private _router: Router


  constructor(
    private _adminServices:AdminService,
  ) {}

  ngOnInit(): void {}

  login(loginForm){
    if (loginForm.valid) {
      console.log(this.user);

      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._adminServices.login_admin(data).subscribe(
        response=>{
          if(response.data == undefined){
            iziToast.error({
              title: 'ERROR',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
              });
          }else{
            this.usuario = response.data;
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.data._id);

            this._router.navigate(['/'])

          }
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      )
    } else {
      //console.log(this.user);
      //alert('Datos No Validos');
      iziToast.error({
      title: 'ERROR',
      class: 'text-danger',
      position: 'topRight',
      message: 'Los Datos son incorrectos'
      })
      };
    }
  }
