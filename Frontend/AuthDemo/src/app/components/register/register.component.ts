import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared.service';
import { UsernameValidator, PasswordValidator, ParentErrorStateMatcher} from 'src/app/validators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  accountDetailsForm:FormGroup;
  matching_passwords_group: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      // { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number and one special character' }
    ]
    // ,
    // 'terms': [
    //   { type: 'pattern', message: 'You must accept terms and conditions' }
    // ]
  }
  // constructor(private fb: FormBuilder, private http:HttpClient) { }
  constructor(private fb: FormBuilder, 
              private service:SharedService,
              private router: Router) { }

  ngOnInit(){
    this.createForms();
    // this.accountDetailsForm = this.fb.group({
    //   Name: [''],
    //   Email: [''],
    //   Password: [''],
    // });
  }

  onSubmitAccountDetails(value){
    console.log(value.matching_passwords.password);
    var val={
          Username:value.username,
          Email:value.email,
          Password:value.matching_passwords.password
        };
    // this.http.post<any>('http://localhost:52938/api/Authentication/createuser', val).subscribe(data => {
    //   console.log(data);
    // },(err:HttpErrorResponse)=>{
    //   console.log(err)});

    this.service.CreateUser(val).subscribe(res=>{
        //this.router.navigate(['/login']);  
        const token = (<any>res).token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("userId", val.Email);
        this.router.navigate(['/main']);  
        console.log(res);
        }, error => {
          console.log(error.errors);
        })
  }
  
  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl('', Validators.compose([
       UsernameValidator.validUsername,
       Validators.maxLength(25),
       Validators.minLength(5),
       //Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      //terms: new FormControl(false, Validators.pattern('true'))
    })

  }

   // Register(){
  //   var val={
  //     Username:this.Username,
  //     Email:this.Email,
  //     Password:this.Password
  //   };
  //   this.service.Register(val).subscribe(data=>{
  //     alert(data.toString());
  //   });
  // }

}

