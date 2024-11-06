export function save(fieldFormData){
    return new Promise ((resolve, reject) => {
        const http = new XMLHttpRequest();
        
        http.onreadystatechange = () => {
        if(http.readyState == 4){
            if(http.status == 201){
                console.log('Hello');
                resolve(true);
            }else{
                reject(false);
                console.log('Request failed with status:', http.status);
            }
        }else{

        }
    };

    http.open("POST", "http://localhost:5055/crop-monitor/api/v1/field", true);
    // http.setRequestHeader("Content-type", "multipart/form-data");
    http.send(fieldFormData);
    }) 
    
}