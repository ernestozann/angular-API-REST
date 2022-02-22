import { Component } from '@angular/core';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent: string = '';
  showImg: boolean = true;
  token: string = ''

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
  ) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'Eru',
      email: 'eru@eru.com',
      password: '1346'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  downloadPdf() {
    this.filesService.getFile(
      'my.pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
    )
    .subscribe()
  }
}
