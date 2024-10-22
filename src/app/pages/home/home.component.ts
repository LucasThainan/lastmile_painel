import { Component } from '@angular/core'
import { MapsComponent } from '../../components/maps/maps.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { }
