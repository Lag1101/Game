
var world_image = new Image ();
world_image.src = 'img/locations/l_start.jpg';

var world_painter = new Painter( "world" ) ;

var world_see_width = 5;
var world_see_height = 3;
var world_bridge_size_w = 250;
var world_bridge_size_h = 150;

var world_location_width = (world_painter.width-world_bridge_size_w)/world_see_width;
var world_location_height = (world_painter.height-world_bridge_size_h)/world_see_height;

var world_map_width = 21;
var world_map_height = 21;
var world_map_start = [(world_map_width-1)/2,(world_map_height-1)/2];
//noinspection UnnecessaryLocalVariableJS
var world_hero_position = world_map_start;
var world_top_left = [world_hero_position[0]-(world_see_height-1)/2,world_hero_position[1]-(world_see_width-1)/2];

var world_map=[] ;
for(var i=0; i<world_map_height; i++) world_map[i]=[];

var shift_x = 0;
var shift_y = 0;
var start_x = 0;
var start_y = 0;

function Catch(e)
{
    start_x = e.clientX-shift_x;
    start_y = e.clientY-shift_y;
}
function UnCatch(e)
{
    shift_x = (e.clientX-start_x);
    shift_y = (e.clientY-start_y);
}
function Move(e)
{
    shift_x = (e.clientX-start_x);
    shift_y = (e.clientY-start_y);

    world_paint_visible();
}

var drag = new DragMaster();
drag.add(world_painter.canvas_element,Catch,UnCatch,Move);
/*
world_painter.canvas_element.addEventListener("mousedown",Catch,true);
world_painter.canvas_element.addEventListener("mouseup",UnCatch,true);
world_painter.canvas_element.addEventListener("mousemove",Move,true);*/

function world_paint_visible() 
{
    var world_buffer;
    var world_x = world_bridge_size_w/world_see_width;
    var world_y = world_bridge_size_h/world_see_height;
    var world_next_x = world_bridge_size_w/world_see_width + world_location_width;
    var world_next_y = world_bridge_size_h/world_see_height + world_location_height;
    
    world_painter.Clear(); // очищает область своего холста
    
    for(var i=0; i<world_map_height; i++)
    {
        for(var j=0;j<world_map_width;j++)
        {
            world_x = world_bridge_size_w/(2*world_see_width)+(j-world_top_left[1])*world_next_x+shift_x;
            world_y = world_bridge_size_h/(2*world_see_height)+(i-world_top_left[0])*world_next_y+shift_y;
            
            if(world_top_left[0]+i >= 0 && world_top_left[1]+j >= 0)
            {
                if(world_map[i][j]!==undefined)
                {
                    if(world_hero_position[0]===i && world_hero_position[1]===j)
                    {
                        world_painter.canvas.fillStyle="#ff0000";
                        world_painter.canvas.fillRect(world_x-5,world_y-5,world_location_width+10,world_location_height+10);
                    }
                    world_buffer = world_map[i][j];
                    world_painter.DrawImage(world_buffer,world_x,world_y,world_location_width,world_location_height);   
                }
                else
                {
                    //world_painter.DrawImage(world_not_search,world_x,world_y,world_location_width,world_location_height);
                }
            }
            
        }
    }
}

/*function world_paint_visible() {
    //alert("work");
    var world_buffer;
    var world_x = world_bridge_size_w/world_see_width;
    var world_y = world_bridge_size_h/world_see_height;
    var world_next_x = world_bridge_size_w/world_see_width + world_location_width;
    var world_next_y = world_bridge_size_h/world_see_height + world_location_height;
    
    world_painter.Clear(); // очищает область своего холста
    
    for(var i=0; i<world_see_height; i++)
    {
        for(var j=0;j<world_see_width;j++)
        {
            world_x = world_bridge_size_w/(2*world_see_width)+j*world_next_x+shift_x;
            world_y = world_bridge_size_h/(2*world_see_height)+i*world_next_y+shift_y;
            
            
            if(world_top_left[0]+i >= 0 && world_top_left[1]+j >= 0)
            {
                if(world_map[world_top_left[0]+i][world_top_left[1]+j]!==undefined)
                {
                    world_buffer = world_map[world_top_left[0]+i] [world_top_left[1]+j];
                    world_painter.DrawImage(world_buffer,world_x,world_y,world_location_width,world_location_height);
                    
                    if(world_hero_position[0]===(world_top_left[0]+i) && world_hero_position[1]===(world_top_left[1]+j))
                    {
                        world_painter.DrawImage(world_hero_pos,world_x+10,world_y+10,30,30); 
                    }
                }
                else
                {
                    //world_painter.DrawImage(world_not_search,world_x,world_y,world_location_width,world_location_height);
                }
            }
            
        }
    }
}*/




function world_go_top() {
    world_travel(0);
    world_paint_visible();
}


function world_go_bot() {
    world_travel(2);
    world_paint_visible();
}


function world_go_left() {
    world_travel(3);
    world_paint_visible();
}


function world_go_right() {
    world_travel(1);
    world_paint_visible();
}


function world_hero_in_center() {
    world_top_left = [world_hero_position[0]-(world_see_height-1)/2,world_hero_position[1]-(world_see_width-1)/2];
    shift_x = 0;
    shift_y = 0;
    world_paint_visible();
}


function world_more_map(e) {
    if(e.wheelDelta<0)
    {
        if(world_see_height < 8)
        {
            world_see_height = world_see_height + 2;
            world_see_width = world_see_width + 2;
            world_location_width = (world_painter.width-world_bridge_size_w)/world_see_width;
            world_location_height = (world_painter.height-world_bridge_size_h)/world_see_height;
            //world_hero_in_center();
            world_paint_visible();
            
        }
       // else alert("Map is maximum");
    }
    else if(e.wheelDelta>0)
    {
        if(world_see_height > 3)
        {
            world_see_height = world_see_height - 2;
            world_see_width = world_see_width - 2;
            world_location_width = (world_painter.width-world_bridge_size_w)/world_see_width;
            world_location_height = (world_painter.height-world_bridge_size_h)/world_see_height;
            //world_hero_in_center();
            world_paint_visible();
        }
       // else alert("Map is minimum");
    }
}

document.getElementById('center').addEventListener("click",world_hero_in_center,false);
document.getElementById("world").addEventListener("mousewheel",world_more_map,false);

world_map[world_map_start[0]][world_map_start[1]] = world_image;
window.addEventListener("load" , world_paint_visible, false);
