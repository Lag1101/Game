var DragnDroper = {
    from: null,
    to: null,
    from_parent: null,
    to_parent: null
};

function ResetDragnDroper(){
    if( DragnDroper.from !== null && DragnDroper.from !== undefined )
    {
        DragnDroper.from.choosed = false;
        DragnDroper.from = null;
    }
    if( DragnDroper.to !== null && DragnDroper.to !== undefined )
    {
        DragnDroper.to.choosed = false;
        DragnDroper.to = null;
    }    
    
    DragnDroper.from_parent = DragnDroper.to_parent = null;
    //DragnDroper.from.card = null;
    DragnDroper.from = DragnDroper.to = null;
    //alert('here')
}

function DragnDrop(i_slot,i_parent) {
    
    if( DragnDroper.from_parent === null )
    {
        if ( i_slot !== null && i_slot !== undefined && i_slot.card !== null && i_slot.card !== undefined )
        {
            i_slot.choosed = true;
            DragnDroper.from = i_slot;
            DragnDroper.from_parent = i_parent;
        }
    }
    else if( DragnDroper.to_parent === null )
    {
        //alert(i_parent)
        if ( i_parent === cards_map.id || (i_parent === persona_window.id ) )
        {
            if( i_slot !== null && i_slot !== undefined )
                i_slot.choosed = true;
            DragnDroper.to = i_slot;
            DragnDroper.to_parent = i_parent;
        }
    }
    if( DragnDroper.from_parent !== null && DragnDroper.to_parent !== null )
    {
        if( DragnDroper.from_parent === cards_map.id && DragnDroper.to_parent === cards_map.id )
        {
            //alert('choosed one field')
            ResetDragnDroper();
        }
        else if( DragnDroper.from_parent === cards_map.id && DragnDroper.to_parent === persona_window.id ||
                DragnDroper.from_parent === persona_window.id && DragnDroper.to_parent === persona_window.id )
        {
            //alert('from cards to pers')
            if( DragnDroper.to !== null && DragnDroper.to !== undefined )
            {
                if( DragnDroper.from.type === DragnDroper.to.type )
                {
                    //alert('types are same')
                    SwitchCards( DragnDroper.from, DragnDroper.to );
                }
            }
            ResetDragnDroper();
        }
        else if( DragnDroper.from_parent === persona_window.id && DragnDroper.to_parent === cards_map.id )
        {
            //alert('from pers to cards')
            if( DragnDroper.from.card !== null && DragnDroper.from.card !== undefined )
            {
                //alert('choosed card in pers is not null')
                
                //alert('problem in new Slot')
                var slot = new Slot( DragnDroper.from.card );
                cards_map.collection.AddSlot(slot);
                DragnDroper.from.card = null;
            }
            else
            {
                //alert('choosed card in pers is null')
            }
            ResetDragnDroper();
        }
        else 
        {
            //alert('pizda 1')
            ResetDragnDroper();
        }
    }
    else{
        //alert('pizda 2')
    }
    
    cards_map.RedrawWindow();
    persona_window.RedrawWindow();
}

function RemoveCard()
{
    DragnDroper.from.card = null;
    ResetDragnDroper();
    cards_map.collection.UpdateSlots();
    DrawSlotsCollection( cards_map.painter, cards_map.collection );
    
    cards_map.RedrawWindow();
    persona_window.RedrawWindow();

}
document.getElementById('less').addEventListener("click" , RemoveCard, false);


function DragMaster() {
    
    // private методы и свойства
    
    var mousedown_f = [],mouseup_f = [],mousemove_f = [];
    
    var drag = false;
    
    var timeout = 0;
    
    var recieved_event = null;
    
    var listtened_element = null;
    
    function doAllFunctions(functions_array)
    {
        for( var i = functions_array.length; i--; )
        {
            functions_array[i](recieved_event);
        }
    }
    
    function mouseDown(e) {
        drag = true;
        recieved_event = e;
        doAllFunctions(mousedown_f,e);
        
        
        listtened_element.addEventListener("mousemove",mouseMove,true);
        
        return false;
    }
    function mouseMove(e){
        if (drag === true) 
        {
            recieved_event = e;
            timeout=setTimeout(mouseMoveHandler,20);
        }
    }
    function mouseMoveHandler() {
        timeout = 0;
        doAllFunctions(mousemove_f,recieved_event);
    }
    function mouseUp(e) {
       
        if (drag === true) 
        {
            timeout = 0;
            drag = false;
            recieved_event = e;
            doAllFunctions(mouseup_f,e);
            
            listtened_element.removeEventListener("mousemove",mouseMove);
        }
    }
   
    // public методы и свойства
    //return {
        this.add = function(element,onmousedown_f,onmouseup_f,onmousemove_f) {
            // инициализовать контроллер
            mousedown_f.push(onmousedown_f);
            mouseup_f.push(onmouseup_f);
            mousemove_f.push(onmousemove_f);
            
            listtened_element = element;
            
            listtened_element.addEventListener("mousedown",mouseDown,true);
            listtened_element.addEventListener("mouseup",mouseUp,true);
        };
    //};
}

