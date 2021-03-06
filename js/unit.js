function Unit() {
    this.own_stats = new Stats();
    this.all_stats = new Stats();
    
    var ego = this;
    
    this.UpdateStats = function(active_slots) {
        ego.all_stats = new Stats();
        
        
        SumStats(ego.all_stats, ego.own_stats);
        
        if( active_slots.length !== 0 )        
        for( var i = active_slots.length; i--; )
        {
            //alert(i)
            if( active_slots[i].card !== null && active_slots[i].card !== undefined)
                SumStats(ego.all_stats, active_slots[i].card.stats);
        }
    };
    /**
     * @return {number}
     */
    this.Level = function() {
        return ego.own_stats.level;
    };
    this.Atack = function() {
        return [ego.own_stats.min_atack,ego.own_stats.max_atack];
    };
    /**
     * @return {number}
     */
    this.SummaryLevel = function() {
        return ego.all_stats.level;
    };
    this.SummaryAtack = function() {
        return [ego.all_stats.min_atack,ego.all_stats.max_atack];
    };    
}








