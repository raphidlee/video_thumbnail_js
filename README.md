# video_thumbnail_js



# Javascript Video Thumbnail Generator

Generates screen-shots from video file via HTML Elements 

## Getting Started

### Prerequisites

just use video.thumbnail.js

### Example

```
var videoLoader = new VideoThumbnail('/test.mp3');

videoLoader.generate()
            .then(function(data){
                console.log(data); // this 'data' contains image/base64

                var blob = videoLoader.getAsBlob(); // you can get BLOB Object with getAsBlob() function.
                console.log(blob);
            });


```

## Running the tests

>node test_server.js

visit http://localhost:8081/index.html


## Authors

* **Raphi D Lee** - *Initial work* 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* etc
