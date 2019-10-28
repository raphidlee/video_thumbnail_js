class VideoThumbnail {
    constructor(localPath) {
        this.localPath = localPath;
    }
    generate(width, height){
        const $this = this;
        return new Promise(function(resolve, reject){

            $this.videoElement = document.createElement('video');
            $this.videoElement.id = 'video-loader-ve-'+(new Date().getTime());
            $this.videoElement.src = $this.localPath;
            $this.videoElement.crossOrigin = 'Anonymous';
            $this.videoElement.style.visibility = 'hidden';

            $this.videoElement.onloadeddata = function() {
                $this.canvasRetry = 3;
                $this.timeoutId = setInterval(function(){
    
                    $this.canvasElement = document.createElement('canvas');
                    $this.canvasElement.id = 'video-loader-ce-'+(new Date().getTime());
        
                    document.body.appendChild($this.canvasElement);
                    $this.canvasElement.getContext('2d').drawImage($this.videoElement, 
                                                                                0, 
                                                                                0, 
                                                                                width? width : $this.videoElement.videoWidth, 
                                                                                height? height : $this.videoElement.videoHeight);
                    $this.dataURL = $this.canvasElement.toDataURL();
                    
                    if($this.dataURL || --$this.canvasRetry == 0){

                        clearInterval($this.timeoutId);
                        document.body.removeChild($this.videoElement);
                        document.body.removeChild($this.canvasElement);

                        if($this.canvasRetry == 0){
                            reject();
                        }else{
                            resolve($this.dataURL);
                        }

                    }
    
                }, 100);
                
            };

            document.body.appendChild($this.videoElement);
        });        
    }

    getAsBlob(){
        const $this = this;
        if($this.dataURL){
            var byteString = atob($this.dataURL.split(',')[1]);

            var mimeString = $this.dataURL.split(',')[0].split(':')[1].split(';')[0]
        
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++)
            {
                ia[i] = byteString.charCodeAt(i);
            }
        
            var bb = new Blob([ab], { "type": mimeString });
            return bb;
        }

        return undefined;
   }
}
