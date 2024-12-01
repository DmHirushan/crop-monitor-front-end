export function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/staff",
      type: "GET",
      dataType: "json", // Automatically parses JSON response
      success: (response) => {
        console.log(response); // Logs the staff members
        resolve(response); // Resolves the promise with the response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(`Request failed: ${textStatus}, ${errorThrown}`);
        reject(`Request failed with status: ${jqXHR.status}`);
      },
    });
  });
}

export function saveStaffMember(staffData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/staff",
      type: "POST",
      contentType: "application/json", // Specify the content type as JSON
      data: JSON.stringify(staffData), // Convert the staff data object to a JSON string
      success: (response) => {
        console.log("Staff member saved successfully:", response);
        resolve(response); // Resolves the promise with the server's response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(`Failed to save staff member: ${textStatus}, ${errorThrown}`);
        reject(`Request failed with status: ${jqXHR.status}`);
      },
    });
  });
}

export function deleteStaffMember(staffId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/staff/${staffId}`, // Use the staffId in the URL
      type: "DELETE", // Specify the request type as DELETE
      success: (response) => {
        console.log("Staff member deleted successfully:", response);
        resolve(response); // Resolves the promise with the server's response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(`Failed to delete staff member: ${textStatus}, ${errorThrown}`);
        reject(`Request failed with status: ${jqXHR.status}`);
      },
    });
  });
}

export function updateStaffMember(staffId, updatedData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/staff/${staffId}`, // Use the staffId in the URL
      type: "PATCH", // Specify the request type as PUT for updates
      contentType: "application/json", // Indicate JSON content
      data: JSON.stringify(updatedData), // Send the updated data as a JSON string
      success: (response) => {
        console.log("Staff member updated successfully:", response);
        resolve(response); // Resolves the promise with the server's response
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error(`Failed to update staff member: ${textStatus}, ${errorThrown}`);
        reject(`Request failed with status: ${jqXHR.status}`);
      },
    });
  });
}

