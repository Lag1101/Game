
var defaultBack = new Image();
defaultBack.src = 'img/hero/card.jpg';

var ussual_slot_size = {width: 100, height: 170};

function Slot(card) {
   
    this.x = 0;
    this.y = 0;
    this.width = ussual_slot_size.width;
    this.height = ussual_slot_size.height;
    this.image = defaultBack;
    
    this.card = card;

    this.type = ( (card === null) || (card === undefined) ) ? Type.deus : card.type;
    
    this.choosed = false;
    this.top = false;

    /**
     * @return {boolean}
     */
    this.IsPointIn = function(mx,my) {
        //alert( "mx "+mx+" my "+my );
        return ( mx>=this.x && mx<this.x+this.width && my>=this.y && my<this.y+this.height );
    };
}

function SmartArray() {
    this.__proto__  = [];
    //this.prototype = [];
    
    this.x0 = this.y0 = this.x1 = this.y1 = null;  //крайние точки множества элементов
    
    this.UpdateCollectionSize = function() {
        var length = this.length;
        
        if( length === 0 )return;
        //alert(this[0].x)
        this.x0 = this[0].x;
        this.y0 = this[0].y;
        this.x1 = this[0].x + this[0].width;
        this.y1 = this[0].y + this[0].height;
        
        if( length === 1 )return;
        
        var element = null;
        
        for( var i = length; i--; )
        {
            element = this[i];
            if( this.x0 > element.x )
                this.x0 = element.x;
                
            if( this.y0 > element.y )
                this.y0 = element.y;
                
            if( this.x1 < element.x + element.width )
                this.x1 = element.x + element.width;
                
            if( this.y1 < element.y + element.height )
                this.y1 = element.y + element.height;
        }
    };

    /**
     * @return {null}
     */
    this.FindElementByPoint = function(point) {
        
        var length = this.length;
        if( length === 0 ) 
            return null;    
        
        //alert([this.x0,this.x1,this.y0,this.y1])
        
        if( point.x < this.x0 || point.y < this.y0 ||
            point.x > this.x1 || point.y > this.y1)
            return null;
            
        var valid_indecces = [];
        
        var element = null;
        var i = 0;
        
        for( i = length; i--; ) // ищем элементы котрые подоходят по x    
        {
            element = this[i];
            if( !(point.x < element.x || point.x > element.x + element.width) ) //принадлежит элементу
                valid_indecces.push( i );
        }
        
        if( valid_indecces.length === 0 ) 
            return null;
            
        for( i = 0; i < valid_indecces.length;  ) // проверяем элементы прошедшие первую проверку  
        {
            element = this[valid_indecces[i]];
            if( point.y < element.y || point.y > element.y + element.height ) //не принадлежит элементу
                valid_indecces.splice(i,1);
            else
                i++;
        } 

        length = valid_indecces.length;

        if( length === 0 )  
            return null;

        if( length === 1 )
            return this[valid_indecces[0]]; 
            
        var element_center_x = null,element_center_y = null;  

        var distance = null, min_distance = 1e10;
        var most_close_element = null;
        for( i = length; i--; )
        {
            element = this[valid_indecces[i]];
            element_center_x = element.x +  element.width/2;
            element_center_y = element.y +  element.height/2;
            
            
            distance = Math.sqrt( Math.pow( point.x - element_center_x , 2 ) + Math.pow( point.y - element_center_y , 2 ) );
            //var distance = Math.abs( mouse_x - card_center_x );// + Math.abs( mouse_y - card_center_y );
            if( distance < min_distance )
            {
                min_distance = distance;
                most_close_element = element;
            }
        }  
        return most_close_element;
    };
}

function SlotCollection(x0,x1,y) {
    this.slots = new SmartArray();
    
    this.begin = x0;
    this.end = x1;
    this.level = y;
    
    this.AddSlot = function( slot ) {
        
        this.slots.push( slot );
        
        this.UpdateSlots();
    };
    
    this.length = function() {
        return this.slots.length;
    };
    
    this.DeleteNotValidateSlots = function() {
        for( var i = 0; i < this.length(); )
        {
            if( (this.slots[i].card === null) || (this.slots[i].card === undefined) )
            {
                this.slots.splice(i,1);
            }
            else{
                i++;
            }
        }
    };
    
    this.UpdateSlots = function() {
        
        this.DeleteNotValidateSlots();
        
        var length = this.slots.length;
        
        if( length > 0 )
        {
            var slot_width = this.slots[0].width;
            if( length == 1 )
            {
                this.slots[0].x = ( this.end + this.begin -100 )/2;
                this.slots[0].y = this.level;
            }
            else
            {
                if( (this.end - this.begin) > slot_width*(length-0.5))
                {
                    for( var i = 0; i < length; i++ )
                    {
                        this.slots[i].x = ( this.end + this.begin )/2 - slot_width*(length+1)/2 + slot_width*( i + .5 );
                        this.slots[i].y = this.level;
                    }
                }
                else
                {
                    for( var i = 0; i < length; i++ )
                    {
                        this.slots[i].x = this.begin + i*( this.end - this.begin)/(length-1);
                        this.slots[i].y = this.level;
                    }
                }
            }
        }
        
        this.slots.UpdateCollectionSize();
        
    };
}



function DrawSlot(i_painter, i_slot) {
    var edge = i_slot.choosed === true ? 5 : 2;
    var transparent = i_slot.choosed === true ? 1 : 0.5;
    var color = rgba(0,255,100,transparent);
    
    i_painter.DrawRectOfSomething(i_slot,color,edge);
    
    if( i_slot.card === null || i_slot.card === undefined )
    {
        i_painter.DrawImage( i_slot.image, i_slot.x, i_slot.y, i_slot.width, i_slot.height);
    }
    else 
    {
        i_painter.DrawImage( i_slot.card.image, i_slot.x, i_slot.y, i_slot.width, i_slot.height);
    }    
       //image, x, y, width, height
}
function DrawSlots(i_painter,i_slots) {
    i_painter.Clear();
    
    var top_slot_index = null;
    var choosed_slot_index = null;
    
    for( var i = 0; i < i_slots.length; i++ )
    {
        if( i_slots[i].top === true || i_slots[i].choosed === true)
        {
            if( i_slots[i].choosed === true )
                top_slot_index = i;
            else
                choosed_slot_index = i;
        }
        else
        {
            DrawSlot( i_painter, i_slots[i] );
        }
    }
    
    if( top_slot_index !== null )
        DrawSlot( i_painter, i_slots[top_slot_index] );
        
    if( choosed_slot_index !== null )
        DrawSlot( i_painter, i_slots[choosed_slot_index] );
    
}

function DrawSlotsCollection( i_painter, i_collection ) {
    i_collection.UpdateSlots();
    DrawSlots(i_painter,i_collection.slots);
}

function SwitchCards(i_slot1,i_slot2) {
    if( i_slot1.card !== null )
    {
        var temp = i_slot1.card;
        i_slot1.card = i_slot2.card;
        i_slot2.card = temp;
    }
}








