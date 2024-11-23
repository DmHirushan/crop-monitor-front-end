import { getAll } from "../model/StaffModel.js";

updateDateTime();
getAllStaffMembers();

function updateDateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  document.querySelector(".date-time-container").innerHTML = `${date} ${time}`;
}

// const datePicker = document.getElementById('datePicker');
// datePicker.addEventListener('change', (event) => {
//   const selectedDate = event.target.value;
//   console.log('Selected date:', selectedDate);
// });

export function getAllStaffMembers() {
  getAll().then((staff) => {
    reloadTable(staff);
  });
}


function reloadTable(staff) {
  let $tableBody = $("#staff-table-body");
  console.log(staff);

  // Clear the table body before adding new rows
  $tableBody.empty();

  $.each(staff, function (index, staffMember) {
    let $newRow = $("<tr>").appendTo($tableBody);

    // Set row data
    $("<td>").text(staffMember.firstName).appendTo($newRow);
    $("<td>").text(staffMember.lastName).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.designation).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.gender).appendTo($newRow);

    const joinedDate = new Date(staffMember.DOB).toISOString().split('T')[0];
    $("<td>").addClass("th-td-space").text(joinedDate).appendTo($newRow);

    const dob = new Date(staffMember.DOB).toISOString().split('T')[0];
    $("<td>").addClass("th-td-space").text(dob).appendTo($newRow);

    const address = staffMember.addressLine1 + staffMember.addressLine2 + staffMember.addressLine3 + staffMember.addressLine4 + staffMember.addressLine5
    $("<td>").addClass("th-td-space").text(address).appendTo($newRow);

    $("<td>").addClass("th-td-space").text(staffMember.contactNo).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.email).appendTo($newRow);
    $("<td>").addClass("th-td-space").text(staffMember.role).appendTo($newRow);


    // Attach a click event handler to load the image when the row is clicked
    $newRow.on("click", function () {
      console.log(`Row clicked for field: ${staffMember.firstName}`);
    });
  });
}

// Get elements
const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const popupIframe = document.getElementById('popupIframe');

// Open popup
openPopup.addEventListener('click', () => {
    popupIframe.src = 'pop-ups/addNewStaffMemberPopUp.html'; // Specify the URL of the page to load
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

// Close popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    popupIframe.src = ''; // Clear the iframe content
});

// Close popup when clicking outside of it
overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    popupIframe.src = ''; // Clear the iframe content
});


