export function getAll() {
    return new Promise((resolve, reject) => {
      let vehicles = [];
      const http = new XMLHttpRequest();
  
      http.onreadystatechange = () => {
        if (http.readyState == 4) {
          if (http.status == 200) {
            vehicles = JSON.parse(http.responseText);
            console.log(vehicles);
            resolve(vehicles);
          } else {
            reject("Request failed with status:", http.status);
          }
        }
      };
  
      http.open("GET", "http://localhost:5055/crop-monitor/api/v1/vehicle", true);
      // http.setRequestHeader("Content-type", "application/json");
      http.send();
    });
  }