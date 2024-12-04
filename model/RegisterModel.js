
export function save(newUser) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:5055/crop-monitor/api/v1/auth/signup",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newUser),
        success: (response) => {
          resolve(response);
        },
        error: (jqXHR, textStatus, errorThrown) => {
          reject(`Save failed: ${textStatus}, ${errorThrown}`);
        },
      });
    });
  }