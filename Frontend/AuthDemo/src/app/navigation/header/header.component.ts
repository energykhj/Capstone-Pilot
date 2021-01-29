import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string="";
  @Output() public sidenavToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // const userId: string = localStorage.getItem("userId");
    // if(userId){
    //   this.service.GetUser(userId).subscribe(res => {
    //     this.userName = res.userId;
    //   })
    // }
    const userId: string = localStorage.getItem("userId");
    if(userId){
      this.userName =  userId;
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
   }

   public changeName(name: string): void {
    this.userName = name;
  }
}
