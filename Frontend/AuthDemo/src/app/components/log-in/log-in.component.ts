import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  invalidLogin: boolean;
  loginForm:FormGroup;
  constructor(private router: Router, 
              private fb: FormBuilder, 
              private service:SharedService) { }

  onLogin(value){
   // alert(value.Email);
    this.service.Login(value).subscribe(res=>{
      const token = (<any>res).token;
      
      localStorage.setItem("jwt", token);
      localStorage.setItem("userId", value.Email);

      this.invalidLogin = false;
      this.router.navigate(["/main"]);
      }, error => {
        this.invalidLogin = true;
        //alert(error.error);
        console.log(error.errors);
      })
  }

  get isLoginUser(){
      return localStorage.getItem("userId");
  }

  ngOnInit(): void {    
    this.loginForm = this.fb.group({
      Email: [''],
      Password: [''],
    });
  }

}
