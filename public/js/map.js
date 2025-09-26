// Initialize map centered somewhere generic first
const map = L.map('map').setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function showListingMarker(listing) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.location)}`);
    const data = await response.json();

    if (data && data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      const marker = L.marker([lat, lon]).addTo(map)
                      .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
                      .openPopup();

      // Center map on this marker
      map.setView([lat, lon], 15);
    } else {
      alert("Address not found!");
    }
  } catch (err) {
    console.error("Geocoding error for listing:", listing.title, err);
  }
}

// Call function
showListingMarker(listing);
