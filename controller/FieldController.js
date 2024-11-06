import { save } from "../model/FieldModel.js";

document.getElementById("fieldForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve field values
    const fieldName = document.getElementById("fieldName").value;
    const fieldLocationLatitude = document.getElementById("fieldLocationLatitude").value;
    const fieldLocationLongitude = document.getElementById("fieldLocationLongitude").value;
    const fieldSize = document.getElementById("fieldSize").value;
    const fieldImage1 = document.getElementById("fieldImage1").files[0];
    const fieldImage2 = document.getElementById("fieldImage2").files[0];

    // Create a FormData object to store and send data
    const formData = new FormData();
    formData.append("fieldName", fieldName);
    formData.append("latitude", fieldLocationLatitude);
    formData.append("longitude", fieldLocationLongitude);
    formData.append("fieldSize", fieldSize);
    if (fieldImage1) formData.append("image1", fieldImage1);
    if (fieldImage2) formData.append("image2", fieldImage2);
    save(formData)
    .then(response => {
        console.log("Data sent successfully:", response.data);
        alert("Field data submitted successfully!");
    })
    .catch(error => {
        console.error("Error submitting data:", error);
        alert("Failed to submit field data.");
    });
});

