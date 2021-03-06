function CardsWindow(i_painter) {
    this.painter = i_painter;
    
    this.collection = new SlotCollection(   ussual_slot_size.width,
                                            i_painter.width-ussual_slot_size.width*2,
                                            i_painter.height/2-ussual_slot_size.height/2);
                                            
    this.id = 'cards window';
                                            
    var ego = this;
    
    this.RedrawWindow = function()
    {
        DrawSlotsCollection( ego.painter, ego.collection );
    };
    
    this.AddRandomCard = function() {
        
        var slot = new Slot(GetCardFromPack());
        ego.collection.AddSlot( slot );
    
        ego.RedrawWindow();
    };
    
    this.Clicked = function(e) {
        
        var mouse_x = e.clientX-ego.painter.x;
        var mouse_y = e.clientY-ego.painter.y;
        
        var choosedCard = ego.collection.slots.FindElementByPoint({x:mouse_x,y:mouse_y}); //ego.FindMostCloseCrossedCardIndex( {x:e.pageX,y:e.pageY} );
    
        if( choosedCard !== null ) //карта найдена
        {
            DragnDrop(choosedCard,ego.id);
        }
        else{
            DragnDrop(null, ego.id);
        }
        
    };
    
    this.Show = function(e) {
        
        var mouse_x = e.clientX-ego.painter.x;
        var mouse_y = e.clientY-ego.painter.y;
        
        var choosedCard = ego.collection.slots.FindElementByPoint({x:mouse_x,y:mouse_y}); //ego.FindMostCloseCrossedCardIndex( {x:e.pageX,y:e.pageY} );
    
        if( choosedCard !== null ) //карта найдена
        {
            for( var i = ego.collection.length(); i--; )
            {
                ego.collection.slots[i].top = false;
            }
            choosedCard.top = true;
            
            span.CreateSpan(choosedCard.x+ego.painter.x, choosedCard.y + ego.painter.y, choosedCard.card.stats.level);
        }
        else{
            for( var i = ego.collection.length(); i--; )
            {
                ego.collection.slots[i].top = false;
            }    
            span.RemoveSpan();
        }

        
        ego.RedrawWindow();
    }
    

    
}

var painter = new Painter(  "cards_map" );
var cards_map = new CardsWindow(painter);


document.getElementById('more').addEventListener("click" , cards_map.AddRandomCard, false);
cards_map.painter.canvas_element.addEventListener("click" , cards_map.Clicked, false);
cards_map.painter.canvas_element.addEventListener("mousemove" , cards_map.Show, false);
window.addEventListener('load', cards_map.RedrawWindow,true);


