import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { environment } from '../environments/environments'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class AppComponent {
  title = 'lastmile_painel'

  ngOnInit(): void {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.google_maps_key}&language=pt-BR&loading=async&callback=Function.prototype`
    script.defer = true
    document.head.appendChild(script)
  }
}
