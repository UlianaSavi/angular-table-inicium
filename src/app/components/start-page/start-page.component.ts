import { Component } from '@angular/core';
import { Paths } from 'src/app/app-routing.module';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  public paths = Paths;
}
