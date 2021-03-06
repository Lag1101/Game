
function CreateSlot(x,y,width,height,type) {
    var result = new Slot();
    result.x = x;
    result.y = y;
    result.height = height;
    result.width = width;
    result.type = type;
    return result;
}
var hero = new Unit();
function PersonaWindow(i_painter) {
        
    this.painter = i_painter;
    
    this.card_width = 50;
    this.card_height = 75;
    this.base_x = (this.painter.width-this.card_width)/2;
    this.base_y = (this.painter.height-this.card_height)/2;
    
    this.parts = new SmartArray();

    this.id = 'persona_window';
    
   
    
    var ego = this; 
    
    this.Init = function() {
        this.parts.push(CreateSlot(this.base_x,         this.base_y - 200,  this.card_width, this.card_height, Type.helmet));       //head
        this.parts.push(CreateSlot(this.base_x - 100,   this.base_y,        this.card_width, this.card_height, Type.weapon));       //left hand
        this.parts.push(CreateSlot(this.base_x + 100,   this.base_y,        this.card_width, this.card_height, Type.weapon));       //right hand
        this.parts.push(CreateSlot(this.base_x,         this.base_y - 50,   this.card_width, this.card_height, Type.armor));        //trunk
        this.parts.push(CreateSlot(this.base_x,         this.base_y + 100,  this.card_width, this.card_height, Type.boots));        //legs
        this.parts.push(CreateSlot(this.base_x - 100,   this.base_y + 200,  this.card_width, this.card_height, Type.proffesion));   //proffesion 
        this.parts.push(CreateSlot(this.base_x + 100,   this.base_y + 200,  this.card_width, this.card_height, Type.race));         //race
        
        this.parts.UpdateCollectionSize();
    };
    
    this.RedrawWindow = function() {
        DrawSlots(ego.painter,ego.parts);
        
        //alert(ego.hero)
        
        hero.UpdateStats(ego.parts);
        $(document.getElementById('hero_lvl')).text(hero.Level());
        $(document.getElementById('sum bonus')).text(hero.SummaryLevel());
        var hero_atack = hero.SummaryAtack();
        $(document.getElementById('hero sum atack')).text(hero_atack[0] + '-' + hero_atack[1]);
        //$(document.getElementById('lvl')).text(hero.CalcBonus(ego.parts).bonus);

    };
    
    this.Choose = function(e) {
    
        var mouse_x = e.clientX-ego.painter.x;
        var mouse_y = e.clientY-ego.painter.y;
        
        var choosedSlot = ego.parts.FindElementByPoint({x:mouse_x,y:mouse_y});
        
        if( choosedSlot === null )
            DragnDrop(null,ego.id);
        else
             DragnDrop(choosedSlot,ego.id);
        
    };
    
    this.Show = function(e) {
    
    //alert('work')
    
        var mouse_x = e.clientX-ego.painter.x;
        var mouse_y = e.clientY-ego.painter.y;
        
        var choosedSlot = ego.parts.FindElementByPoint({x:mouse_x,y:mouse_y});

        if( choosedSlot === false )
            span.RemoveSpan();
        else
             span.CreateSpan(choosedSlot.x+ego.painter.x,choosedSlot.y+ego.painter.y,choosedSlot.card.stats.level);

            
        ego.RedrawWindow();
    };
    
    this.Init();
}

var persona_painter = new Painter("persona");
var persona_window = new PersonaWindow(persona_painter);

persona_window.painter.canvas_element.addEventListener("click" , persona_window.Choose, true);
persona_window.painter.canvas_element.addEventListener("mousemove" , persona_window.Show, true);

window.addEventListener('load', persona_window.RedrawWindow,true);





