var title= "Road Home"
function setup() {
	noCanvas()
  noCursor()
  
}

//$('#gl').click(function(){

function mousePressed(){
   
    var elt = $('#gl')[0]//you want to capture
    
    html2canvas(elt, 
    {
      onrendered: function (canvas) {
        var a = $('#download')
       // document.append(a)
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        //saveCanvas(canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"))
        //a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        let img = canvas.toDataURL("image/jpeg")//.replace("image/jpeg", "image/octet-stream")
        saveCanvas(img, 'road_home.jpg' )
       // a.download = 'road_home.jpg';
        //a.click();
        console.log("rendered")
      }})
    }