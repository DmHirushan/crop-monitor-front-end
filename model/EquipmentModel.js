export function getAll() {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/crop-monitor/api/v1/equipment",
          type: "GET",
          success: (data) => {
              console.log(data);
              resolve(data);
          },
          error: (jqXHR, textStatus, errorThrown) => {
              reject(`Request failed: ${textStatus}, ${errorThrown}`);
          }
      });
  });
}


export function save(equipment) {
  return new Promise((resolve, reject) => {
      $.ajax({
          url: "http://localhost:5055/crop-monitor/api/v1/equipment",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(equipment),
          success: (response) => {
              console.log("Equipment saved successfully:", response);
              resolve(response);
          },
          error: (jqXHR, textStatus, errorThrown) => {
              reject(`Save failed: ${textStatus}, ${errorThrown}`);
          }
      });
  });
}

export function deleteEquipment(equipmentId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/crop-monitor/api/v1/equipment/${equipmentId}`,
        type: "DELETE",
        success: (response) => {
          console.log("Equipment deleted successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(`Delete failed: ${textStatus}, ${errorThrown}`);
        }
      });
    });
  }
  
  export function updateEquipment(equipmentId, updatedData) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:5055/crop-monitor/api/v1/equipment/${equipmentId}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: (response) => {
          console.log("Equipment updated successfully:", response);
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(`Update failed: ${textStatus}, ${errorThrown}`);
        }
      });
    });
  }
  
