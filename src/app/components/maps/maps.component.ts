import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { } from 'googlemaps'
import { SocketService } from '../../services'
import { Security } from '../../utils/security.utils'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {
  user!: User
  entregadores: any[] = []

  map!: google.maps.Map
  source!: google.maps.LatLngLiteral

  sourcePins: google.maps.Marker[] = []
  sourcePin!: google.maps.Marker
  locationWatchId!: number

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 16,
  }

  ds!: google.maps.DirectionsService
  dr!: google.maps.DirectionsRenderer

  showMapPill: boolean = false

  constructor(private readonly socketService: SocketService) {
    this.socketService.on('entregador_connected', (data) => {
      this.entregadores.push(data.entregador)
    })

    this.socketService.on('entregador_disconnected', (data) => {
      let index = this.entregadores.findIndex(entregador => entregador.cod_entregador == data.cod_entregador)
      if (index > -1) this.entregadores.splice(index, 1)
    })
  }

  ngOnInit(): void {
    this.user = Security.getUser()

    this.ds = new google.maps.DirectionsService()
    this.dr = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      map: undefined,
    })

    this.init()
    this.socketService.on('updated_location', (data: any) => {
      data.users.forEach((v: any, i: number) => {
        let lat = parseFloat(v.lat)
        let lng = parseFloat(v.lng)

        if (!isNaN(lat) && !isNaN(lng)) {
          this.entregadores[i].lat = parseFloat(v.lat)
          this.entregadores[i].lng = parseFloat(v.lng)
  
          if (this.entregadores[i].sourcePin) {
            this.entregadores[i].sourcePin.setPosition({
              lat: parseFloat(v.lat),
              lng: parseFloat(v.lng)
            })
          } else {
            this.entregadores[i].sourcePin = new google.maps.Marker({
              position: {
                lat: parseFloat(v.lat),
                lng: parseFloat(v.lng)
              },
              map: this.map
            })
  
            this.entregadores[i].sourcePin.addListener("click", (event: any) => {
              this.showMapPill = true
              this.onCenterMap()
            })
          }
        }
      })
    })

    if (this.user.type == 2) this.watchLocation()
  }

  init() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.source = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        ...this.options,
        center: this.source
      })

      this.map.addListener("click", (event: any) => {
        this.showMapPill = false
      })

      this.entregadores.forEach((entregador: any) => {
        entregador.sourcePin = new google.maps.Marker({
          position: {
            lat: entregador.lat,
            lng: entregador.lng
          },
          map: this.map
        })
      })
    })
  }

  onCenterMap() {
    this.map.panTo(this.source)
  }

  watchLocation() {
    this.locationWatchId = navigator.geolocation.watchPosition(
      (position) => {
        this.source = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        if (this.sourcePin) {
          this.sourcePin.setPosition(this.source)
        }

        this.socketService.emit('set_location', {
          socket_id: this.socketService.getId(),
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error: any) => console.log(error)
    )
  }
}
