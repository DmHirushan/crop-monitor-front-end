import { deleteCrop, getAll } from "../model/CropModel.js";

updateDateTime();
setInterval(updateDateTime, 1000);
getAllCrops();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

export function getAllCrops() {
  getAll().then((crops) => {
    reloadTable(crops);
  });
}

function reloadTable(crops) {
  let $tableBody = $("#crop-table-body");
  console.log(crops);

  // Clear the table body before adding new rows
  $tableBody.empty();

  $.each(crops, function (index, crop) {
    let $newRow = $("<tr>").appendTo($tableBody);

    // Set row data
    $("<td>").text(crop.cropCommonName).appendTo($newRow);
    $("<td>").text(crop.cropScientificName).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(crop.category).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(crop.cropSeason).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(crop.fieldName).appendTo($newRow);

    // Add edit and delete icons
    $("<td>")
      .append(
        $("<a>")
          .attr("href", "#")
          .on("click", function (e) {
            e.preventDefault();
            openPopup(); // Call a function to open the popup for edit
          })
          .append($("<i>").addClass("fa-solid fa-pen-to-square icon-space icon-padding-left")) // Edit icon
      )
      .append(" ")
      .append(
        $("<a>")
          .attr("href", "#")
          .on("click", function (e) {
            e.preventDefault();
            deleteCropWithCropCode(crop.cropCode);
          })
          .append($("<i>").addClass("fa-solid fa-delete-left")) // Delete icon
      )
      .appendTo($newRow);

    // Attach a click event handler to load the image when the row is clicked
    $newRow.on("click", function () {
      console.log(`Row clicked for field: ${crop.cropCommonName}`);

      // Convert if it's base64, or use directly if it's a URL
      const imageUrl = base64ToImageURL(crop.cropImage); 

      // Set the `src` attribute of the image inside `.image-container`
      $("#loaded-crop-image").attr("src", imageUrl);
    });
  });
}

// Helper function if your image data is in base64
function base64ToImageURL(base64Data) {
  return `data:image/png;base64,${base64Data}`;
}

function deleteCropWithCropCode(cropCode) {
  const userConfirmation = confirm('Are you sure you want to delete this crop?');
  
  if (userConfirmation) {
    // User clicked "OK" (Yes)
    deleteCrop(cropCode)
      .then((message) => {
        console.log(message); // "Crop deleted successfully"
        getAllCrops();
      })
      .catch((error) => {
        console.error('Crop deletion failed:', error);
      });
  } else {
    // User clicked "Cancel" (No)
    console.log('Crop deletion canceled');
  }
}


function openPopup() {
  $("#popupModal").show();
}

function deletePopup() {
  $("#popupModal").show();
}

// Close the modal when the close button is clicked
$(document).on("click", ".close-btn", function () {
  $("#popupModal").hide();
});

