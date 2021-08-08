import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private nav: NavController) {}

  async navigate() {
    await this.nav.navigateForward(['tabs', 'tab2']);
    // await new Promise(resolve => setTimeout(resolve, 100));
    this.nav.navigateForward(['tabs', 'tab2', 'child-route']);
  }
}
