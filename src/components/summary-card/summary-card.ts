import { Component, Input } from '@angular/core';
import { Place } from '../../core/models/place';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@Component({
  selector: 'summary-card',
  templateUrl: 'summary-card.html'
})
export class SummaryCardComponent {

  @Input() public paymentCode: string;
  @Input() public price: number;
  @Input() public restaurant: Place;

  constructor(
    private launchNavigator: LaunchNavigator
  ) {}

  public trackRestaurant(): void {
    const { lat, lng } = this.restaurant

    this.launchNavigator.navigate([lat, lng], {}).then(()=>{
      console.log("launched successfully");
    }).catch(()=>{
      console.log("launch failed");
    })
  }

}
