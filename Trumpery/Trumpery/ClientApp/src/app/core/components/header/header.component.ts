import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fileSelected(fileList) {
    if (fileList && fileList.length === 1) {
      const file = fileList[0];

    }
  }

}
