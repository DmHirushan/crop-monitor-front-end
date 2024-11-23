import { getAll } from "../model/EquipmentModel.js";

updateDateTime();
getAllEquipments();

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

export function getAllEquipments() {
    getAll().then((equipments) => {
      reloadTable(equipments);
    });
  }
  
  
  function reloadTable(equipments) {
    let $tableBody = $("#equipment-table-body");
    console.log(equipments);
  
    // Clear the table body before adding new rows
    $tableBody.empty();
  
    $.each(equipments, function (index, equipment) {
      let $newRow = $("<tr>").appendTo($tableBody);
  
      // Set row data
      $("<td>").text(equipment.equipmentId).appendTo($newRow);
      $("<td>").text(equipment.name).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(equipment.equipmentType).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(equipment.status).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(equipment.assignedStaffId).appendTo($newRow);
      $("<td>").addClass("th-td-space").text(equipment.assignedFieldCode).appendTo($newRow); 
  
      $newRow.on("click", function () {
        console.log(`Row clicked for field: ${equipment.name}`);
      });
    });

  }