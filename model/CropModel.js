export function getAll() {
    return new Promise((resolve, reject) => {
      let crops = [];
      const http = new XMLHttpRequest();
  
      http.onreadystatechange = () => {
        if (http.readyState == 4) {
          if (http.status == 200) {
            crops = JSON.parse(http.responseText);
            console.log(crops);
            resolve(crops);
          } else {
            reject("Request failed with status:", http.status);
          }
        }
      };
  
      http.open("GET", "http://localhost:5055/crop-monitor/api/v1/crop", true);
      // http.setRequestHeader("Content-type", "application/json");
      http.send();
    });
  }

  export function deleteCrop(cropCode) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
  
      http.onreadystatechange = () => {
        if (http.readyState == 4) {
          if (http.status == 200) {
            resolve("Crop deleted successfully");
          } else {
            reject("Request failed with status: " + http.status);
          }
        }
      };
  
      http.open("DELETE", `http://localhost:5055/crop-monitor/api/v1/crop/${cropCode}`, true);
      http.send();
    });
  }

  export function saveCrop(formData) {
    $.ajax({
      url: "http://localhost:5055/crop-monitor/api/v1/crop",
      type: "POST",
      processData: false, // Prevent jQuery from automatically transforming the data into a query string
      contentType: false, // Let the browser set the correct Content-Type header
      data: formData, // Send the FormData object
      success: (response) => {
        alert("Crop saved successfully!");
      },
      error: (jqXHR, textStatus, errorThrown) => {
        alert(`Failed to save crop: ${textStatus} - ${errorThrown}`);
      },
  });
}

export function getCrop(cropCode) {
  $.ajax({
      url: `http://localhost:5055/crop-monitor/api/v1/crop/${cropCode}`, // API endpoint with cropCode
      type: "GET", // HTTP method
      success: (response) => {
          // Process the response
          console.log("Crop details retrieved successfully:", response);
          alert(`Crop Name: ${response.cropCommonName}\nScientific Name: ${response.cropScientificName}`);
      },
      error: (jqXHR, textStatus, errorThrown) => {
          alert(`Failed to fetch crop: ${textStatus} - ${errorThrown}`);
      },
  });
}

  
  