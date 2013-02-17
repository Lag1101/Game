function Window(i_painter)
{
    if( i_painter === null || i_painter === undefined )alert( 'i_painter is null' );
    
    this.painter = i_painter;
    this.id = 'default id';
    this.slots = [];
    
    var ego = this;
    
    this.Init = function() {
        alert( 'предок UnitWindow не переопределил Init' );
    };
    this.Redraw = function() {
        DrawSlots(ego.painter,ego.slots);
    };
    this.Choose = function() {
        
    };
}

function UnitWindowHeader()
{
    
}

function UnitWindow(i_painter)
{
    this.__proto__ = new UnitWindow(i_painter);
    this.unit = new Unit();
    this.slots = new SmartArray();
    
    var ego = this;
    
    this.Redraw = function()
    {
        //alert(ego.hero)
        
        this.unit.UpdateStats(this.slots);
        $(document.getElementById('hero_lvl')).text(this.unit.Level());
        $(document.getElementById('sum bonus')).text(this.unit.SummaryLevel());
        var unit_atack = this.unit.SummaryAtack();
        $(document.getElementById('hero sum atack')).text(unit_atack[0] + '-' + unit_atack[1]);
    };
}