console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


locService.getLocs()

    .then(locs => console.log('locs', locs))

window.onload = () => {
    locService.getPosition()
        .then(pos => {
            
            document.querySelector('.btn').addEventListener('click', (ev) => {
                console.log('Aha!', ev.target);
                // mapService.panTo(locService.getPosition().center);
                mapService.panTo(pos.coords.latitude, pos.coords.longitude);
            })
            
            console.log('User position is:', pos.coords);
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                .then(() => {

                    // mapService.addMarker(locService.getPosition());
                    mapService.addMarker({lat:pos.coords.latitude,lng: pos.coords.longitude});
                })
                .catch(console.log('INIT MAP ERROR'));
        })  
        .catch(err => {
            console.log('err!!!', err);
        })



}

