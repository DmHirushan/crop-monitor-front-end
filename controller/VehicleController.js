import { getAll } from "../model/VehicleModel.js";

updateDateTime();
getAllVehicles();

document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.querySelector('.date-time-container');
    datePicker.addEventListener('change', (event) => {
        const selectedDate = event.target.value;
        console.log('Selected date:', selectedDate);
    });
});

function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

export function getAllVehicles() {
    getAll().then((vehicles) => {
      reloadTable(vehicles);
    });
  }
  
  
  function reloadTable(vehicles) {
    let $tableBody = $("#staff-table-body");
    console.log(vehicles);
  
    // Clear the table body before adding new rows
    $tableBody.empty();
  
    $.each(vehicles, function (index, vehicle) {
      let $newRow = $("<tr>").appendTo($tableBody);
  
      // Set row data
      $("<td>").text(vehicle.vehicleCode).appendTo($newRow);
      $("<td>").text(vehicle.licensePlateNumber).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(vehicle.vehicleCategory).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(vehicle.fuelType).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(vehicle.status).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(vehicle.remarks).appendTo($newRow); 
      $("<td>").addClass("th-td-space").text(vehicle.staffId).appendTo($newRow);
  
      $newRow.on("click", function () {
        console.log(`Row clicked for field: ${vehicle.licensePlateNumber}`);
      });
    });

  }
