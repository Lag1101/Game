var enemy = new Unit();
function EnemyWindow(i_painter) {
    this.painter = i_painter;
    
    //this.slot = CreateSlot(this.painter.x,this.painter.y,this.painter.width,this.painter.height,Type.enemy);
    this.slot = CreateSlot(this.painter.x+this.painter.width/2-100,this.painter.y+this.painter.height/2-100,200,200,Type.enemy);
    this.slot.card = null;
    
    
    
    var ego = this;

   
    this.GetNewEnemy = function()
    {
        ego.slot.card = Enemys.GetCard();
        ego.UpdateWindow();
    };
    
    this.UpdateWindow = function()
    { 
        if( ego.slot.card !== null && ego.slot.card !== undefined )
        {
            var slot = [];
            slot.push(ego.slot);
            //alert(ego.slot.card.stats.level)
            enemy.UpdateStats(slot);
            
            $(document.getElementById('enemy_lvl')).text(enemy.SummaryLevel());
            
            var enemy_atack = enemy.SummaryAtack();
            $(document.getElementById('enemy atack')).text(enemy_atack[0] + '-' + enemy_atack[1]);
        }
        else
        {
             $(document.getElementById('enemy_lvl')).text('');
             $(document.getElementById('enemy atack')).text('');
        }
        DrawSlot(ego.painter,ego.slot);
    };
    
    this.EnemyDefeated = function()
    {
        ego.slot.card = null;
        ego.UpdateWindow();
    };
}
var enemy_painter = new Painter('enemy');
var enemy_window = new EnemyWindow(enemy_painter);

window.addEventListener('load',enemy_window.UpdateWindow,false);

