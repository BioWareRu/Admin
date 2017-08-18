import {Component, OnInit} from '@angular/core';
import {AppState} from '../core/AppState';
import {SettingsService} from '../services/SettingsService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private _appState: AppState) {
  }

  ngOnInit(): void {

  }
}
