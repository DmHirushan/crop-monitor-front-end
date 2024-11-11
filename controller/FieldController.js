import { getAll, save} from "../model/FieldModel.js";

updateDateTime();
setInterval(updateDateTime, 1000);

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector('.date-time-container').innerHTML = `${date} ${time}`;
}



// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13); // Default view coordinates

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marker to indicate selected location
let marker;

// Handle click events on the map
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    // Update marker position or create a new marker
    if (marker) {
        marker.setLatLng(e.latlng);
    } else {
        marker = L.marker(e.latlng).addTo(map);
    }

    // Display selected location coordinates
    document.getElementById('location-display').innerHTML = 
        `Selected Location: Latitude ${lat.toFixed(5)}, Longitude ${lng.toFixed(5)}`;
});




$(document).ready(function () {
  getAllFields();

  // Handle form submission
  $("#fieldForm").on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve field values
    const fieldName = $("#fieldName").val();
    const fieldLocationLatitude = $("#fieldLocationLatitude").val();
    const fieldLocationLongitude = $("#fieldLocationLongitude").val();
    const fieldSize = $("#fieldSize").val();
    const fieldImage1 = $("#fieldImage1")[0].files[0];
    const fieldImage2 = $("#fieldImage2")[0].files[0];

    // Create FormData object to store and send data
    const formData = new FormData();
    formData.append("fieldName", fieldName);
    formData.append("latitude", fieldLocationLatitude);
    formData.append("longitude", fieldLocationLongitude);
    formData.append("fieldSize", fieldSize);
    if (fieldImage1) formData.append("image1", fieldImage1);
    if (fieldImage2) formData.append("image2", fieldImage2);

    save(formData)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        alert("Field data submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("Failed to submit field data.");
      });
  });

  function getAllFields() {
    getAll().then((fields) => {
      reloadTable(fields);
    });
  }

  function reloadTable(fields) {
    let $tableBody = $("#customer-table-body");

    // Clear the table body before adding new rows
    $tableBody.empty();

    $.each(fields, function (index, field) {
      let $newRow = $("<tr>").appendTo($tableBody);

      // Make row clickable
      $newRow.on("click", function () {
        console.log(`Row clicked for field: ${field.fieldName}`);
        console.log(field.image1);
        $("#img1").attr("src", base64ToImageURL(field.image1));
      });

      $("<td>").text(field.fieldCode).appendTo($newRow);
      $("<td>").text(field.fieldName).appendTo($newRow);
      $("<td>").text(field.fieldSize).appendTo($newRow);
    });
  }

  function base64ToImageURL(base64Image) {
    return `data:image/jpeg;base64,${base64Image}`;
  }

  // Optional: Converting Base64 to Byte Array (if needed)
  function base64ToByteArray(base64Image) {
    const binaryString = window.atob(base64Image);
    const length = binaryString.length;
    const byteArray = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    return byteArray;
  }
});
