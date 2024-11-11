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