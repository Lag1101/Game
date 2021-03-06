function findPos(obj) {

    var curleft = -window.screenLeft, curtop = -window.screenTop;

    if (obj.offsetParent) {

        curleft = obj.offsetLeft;

        curtop = obj.offsetTop;

        while (obj = obj.offsetParent) {

            curleft += obj.offsetLeft;

            curtop += obj.offsetTop;

        }

    }

    return [curleft,curtop];
        
}

function Painter(element_id) {
                
    this.canvas_element = document.getElementById( element_id );

    this.Init = function()
    {
        this.height = this.canvas_element.height = this.canvas_element.offsetHeight ;
        this.width = this.canvas_element.width = this.canvas_element.offsetWidth ;

        var pos = findPos(this.canvas_element);
        this.x = pos[0];
        this.y = pos[1];

        this.canvas = this.canvas_element.getContext('2d');
    };
    this.Init();
       
       
//functions

    this.DrawImage = function( image, x, y, width, height ) {
        if( image !== null )
            this.canvas.drawImage(image,0,0,image.width,image.height,x,y,width,height);
    };
    
    this.DrawImageNative = function( image, x, y ) {
        this.canvas.drawImage( image,x,y );
    };
    
    this.SetColor = function(fillColor, strokeColor) {
        if ( fillColor !== null && fillColor !== undefined )
            this.canvas.fillStyle = fillColor;
            
        if ( strokeColor !== null && strokeColor !== undefined )
            this.canvas.strokeStyle = strokeColor;
    };
    
    this.DrawRect = function( x, y, width, height ) {
        this.canvas.strokeRect( x, y, width, height );
    };
    
    this.Clear = function( )  {
        this.canvas.clearRect ( 0 , 0 , this.width , this.height );
    };
    
    this.DrawRectOfSomething = function(something,color,edge) {
        this.canvas.strokeStyle = color;
        for( var i = 0; i < edge; i++ )
            this.DrawRect( something.x-i, something.y-i, something.width+2*i, something.height+2*i );
    };
    
    this.DrawText = function(text,x,y,max_width) {
        this.canvas.font = "20pt Courier";
        if( max_width !== undefined )
            this.canvas.fillText(text,x,y,max_width);
        else
            this.canvas.fillText(text,x,y);
    };
    

    
    window.addEventListener("resize" , this.Init, false);

}
    
    

function rgb(r,g,b) {
    return 'rgb('+r+','+g+','+b+')';
}
function rgba(r,g,b,a) {
    return 'rgba('+r+','+g+','+b+','+a+')';
}
