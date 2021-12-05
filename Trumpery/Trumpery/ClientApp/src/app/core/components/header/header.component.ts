import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/modules/animation/animation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private readonly animationService: AnimationService
    ) { }


  ngOnInit(): void {
  }

  fileSelected(fileList) {
    if (fileList && fileList.length === 1) {
      const file = fileList[0];
      this.animationService.uploadCaff(file).subscribe(console.log);
    }
  }

}
