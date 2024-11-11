import { getAll } from "../model/CropModel.js";

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

    // Make row clickable
    $newRow.on("click", function () {
      console.log(`Row clicked for field: ${crop.cropCommonName}`);
      // console.log(crops.image1);
      // $("#img1").attr("src", base64ToImageURL(crops.image1));
    });

    $("<td>").text(crop.cropCommonName).appendTo($newRow);
    $("<td>").text(crop.cropScientificName).appendTo($newRow);
    $("<td>").text(crop.category).appendTo($newRow);
    $("<td>").text(crop.cropSeason).appendTo($newRow);
    $("<td>").text(crop.fieldName).appendTo($newRow);
    $("<td>");
    $("<td>")
      .append(
        $("<a>")
          .attr("href", "#") // Set link behavior
          .on("click", function (e) {
            e.preventDefault(); // Prevent default link behavior
            openPopup(); // Call a function to open the popup
          })
          .append($("<i>").addClass("fa-solid fa-pen-to-square icon-space")) // Add Font Awesome icon
          .append(
            $("<a>")
              .attr("href", "#") // Set link behavior
              .on("click", function (e) {
                e.preventDefault(); // Prevent default link behavior
                openPopup(); // Call a function to open the popup
              })
              .append($("<i>").addClass("fa-solid fa-delete-left")) // Add Font Awesome icon
          )
      )
      .appendTo($newRow);
  
  })};


// function base64ToImageURL(base64Image) {
//   return `data:image/jpeg;base64,${base64Image}`;
// }

// Optional: Converting Base64 to Byte Array (if needed)
// function base64ToByteArray(base64Image) {
//   const binaryString = window.atob(base64Image);
//   const length = binaryString.length;
//   const byteArray = new Uint8Array(length);

//   for (let i = 0; i < length; i++) {
//     byteArray[i] = binaryString.charCodeAt(i);
//   }

//   return byteArray;
// }
