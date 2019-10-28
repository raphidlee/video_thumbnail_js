
let BASE_URL =  "http://test-server";
var test = function(){

    var testPath = "/home/yidonguk/Desktop/SampleVideo_1280x720_1mb.mp4";

    if(document.getElementById("file-input").value){
        testPath = document.getElementById("file-input").value;
    }
    //testPath = "SampleVideo_1280x720_1mb.mp4";
    var videoLoader = new VideoThumbnail(testPath);
    videoLoader.generate().then(function(data){
        console.log(data);
        var blob = videoLoader.getAsBlob();
        console.log(blob);
        //upload(blob);
    });
};

var upload = function(blob){
    var formData = new FormData();
    formData.append("inputFile", blob);

    var xhr = new XMLHttpRequest();
    // xhr.onload = completeRequest;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            console.log(xhr.response);

            if(xhr.status == 200){
                console.log(BASE_URL+"/download/"+(JSON.parse(xhr.response).fileid));

            }
        }
    }

    xhr.open("POST", BASE_URL);
    xhr.send(formData);
};
