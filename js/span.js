function Span() {
    
    this.parent = document.getElementsByTagName('BODY')[0];
    this.span_element = document.createElement('p');
    this.span_element.id = 'Span';
    
    this.parent.appendChild(this.span_element);
    
    this.span_element.style.visibility='hidden';
    
    var ego = this;
    
    this.RemoveSpan = function()
    {
         ego.span_element.style.visibility='hidden';
    };
    this.CreateSpan = function(x,y,text)
    {
        ego.RemoveSpan();
        if(text === null || text === undefined)
            return;
        
        ego.span_element.style.visibility='visible';
        
        ego.span_element.style.top = y + 'px';
        ego.span_element.style.left = x + 'px';
        
        var target = ego.span_element.childNodes[0];     

        ego.span_element.appendChild(document.createTextNode(text));

        ego.span_element.removeChild(target);
    };
    

}
var span = new Span();

