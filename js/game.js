document.getElementById('top').addEventListener("click",world_go_top,false);
document.getElementById('bot').addEventListener("click",world_go_bot,false);
document.getElementById('left').addEventListener("click",world_go_left,false);
document.getElementById('right').addEventListener("click",world_go_right,false);



for( var i = 0; i < 3; i++ )
    cards_map.AddRandomCard();

function world_travel(world_direction) {
    switch (world_direction) 
    {
        case 0:
            {
                if(world_hero_position[0] > 0)
                {
                    world_hero_position[0]--;
                    if(world_hero_position[0]<world_top_left[0]) world_top_left[0]--;
                }
                else alert("limit map");
            }
        break;
        
        case 1:
            {
                if(world_hero_position[1] < world_map_width)
                {
                    world_hero_position[1]++;
                    if(world_hero_position[1]>world_top_left[1]+world_see_width-1) world_top_left[1]++;
                }
                else alert("limit map");
            }
        break;
        
        case 2:
            {
                if(world_hero_position[0] < world_map_height)
                {
                    world_hero_position[0]++;
                    if(world_hero_position[0]>world_top_left[0]+world_see_height-1) world_top_left[0]++;
                }
                else alert("limit map");
            }
        break;
        
        case 3:
            {
                if(world_hero_position[1] > 0)
                {
                    world_hero_position[1]--;
                    if(world_hero_position[1]<world_top_left[1]) world_top_left[1]--;
                }
                else alert("limit map");
            }
        break;
        
        default:
        {
            alert("nixua");
        } 
    }
    
    var new_location = false;
    
    if(world_map[world_hero_position[0]][world_hero_position[1]] === undefined)
    {
        new_location = true;
        world_map[world_hero_position[0]][world_hero_position[1]] = Locations.GetCard().image;
    }   
    
    
    if( new_location === true )
    {
        Events();
        //GetCardFromPack.ge
    }
    
    cards_map.RedrawWindow();
    persona_window.RedrawWindow();
}

function Events()
{
    cards_map.AddRandomCard();
    
    enemy_window.GetNewEnemy();
    
    var hero_atack =  hero.SummaryAtack();
    var enemy_atack = enemy.SummaryAtack();
    
    var total_hero_atack = hero.SummaryLevel() + Math.random()*(hero_atack[1]-hero_atack[0])+hero_atack[0];
    var total_enemy_atack = enemy.SummaryLevel() + Math.random()*(enemy_atack[1]-enemy_atack[0])+enemy_atack[0];
    
    
    if( total_enemy_atack < total_hero_atack )
    {
        alert( total_hero_atack + ' vs ' + total_enemy_atack + ' you WIN !!!!!!!!!!!!!!' );
        
        enemy_window.EnemyDefeated();
        
        cards_map.AddRandomCard();
        
        hero.own_stats.level++;
    }
    else
    {
        alert( total_hero_atack + ' vs ' + total_enemy_atack + ' you Loose !!!!!!!!!!!!!!' );
    }
}