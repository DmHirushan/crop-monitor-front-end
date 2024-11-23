export function getAll() {
    return new Promise((resolve, reject) => {
      let equipments = [];
      const http = new XMLHttpRequest();
  
      http.onreadystatechange = () => {
        if (http.readyState == 4) {
          if (http.status == 200) {
            equipments = JSON.parse(http.responseText);
            console.log(equipments);
            resolve(equipments);
          } else {
            reject("Request failed with status:", http.status);
          }
        }
      };
  
      http.open("GET", "http://localhost:5055/crop-monitor/api/v1/equipment", true);
      // http.setRequestHeader("Content-type", "application/json");
      http.send();
    });
  }