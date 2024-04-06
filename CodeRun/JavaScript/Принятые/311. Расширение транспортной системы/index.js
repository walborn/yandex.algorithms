class EarthRoute {
  static vault = []
  transfer(parcel) {
    parcel.destination = 'Earth'
    EarthRoute.vault.push(parcel)
  }
}

class MoonRoute {
  static warehouse = []
  transfer(parcel) {
    parcel.destination = 'Moon'
    MoonRoute.warehouse.push(parcel)
  }
}

const extendTransportSystem = (RouteEarch, RouteMoon) => {
  const parcels = []
  RouteEarch.prototype.transfer = (parcel) => {
    parcel.destination = 'Earth'
    RouteEarch.vault.push({ ...parcel })
    parcel.origin = parcel.destination
    parcel.destination = 'Mothership'
    parcels.push(parcel)
  }
  RouteMoon.prototype.transfer = (parcel) => {
    parcel.destination = 'Moon'
    RouteMoon.warehouse.push({ ...parcel })
    parcel.origin = parcel.destination
    parcel.destination = 'Mothership'
    parcels.push(parcel)
  }
  return (() => parcels)()
}


const mothershipStorage = extendTransportSystem(EarthRoute, MoonRoute)

console.log(mothershipStorage)

const earthRoute1 = new EarthRoute()
const moonRoute2 = new MoonRoute()

earthRoute1.transfer({ content: 123 })
moonRoute2.transfer({ text: 'abc' })

console.log(mothershipStorage)
/* [
 *   { content: 123, origin: 'Earth', destination: 'Mothership' },
 *   { text: 'abc', origin: 'Moon', destination: 'Mothership' }
 * ]
 */

console.log(EarthRoute.vault)
/* [
 *   { content: 123, destination: 'Earth' }
 * ]
 */

console.log(MoonRoute.warehouse)
/* [
 *   { text: 'abc', destination: 'Moon' }
 * ]
 */