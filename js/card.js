var Type = {
    weapon : 1,
    armor : 2,
    helmet : 3,
    boots : 4,
    proffesion : 5,
    race : 6,
    deus : 7,
    enemy : 8
};
function Stats() {
    this.level = 1;
    this.min_atack = 0;
    this.max_atack = 0;
    this.flaiming = false;
    this.fly = false;
    this.free_closed_doors = false;
    this.free_hidden_doors = false;
}
function SumStats(dest,source) {
    
    dest.level += source.level;
    dest.min_atack += source.min_atack;
    dest.max_atack += source.max_atack;
    dest.flaiming |= source.flaiming;
    dest.fly |= source.fly;
    dest.free_closed_doors |= source.free_closed_doors;
    dest.free_hidden_doors |= source.free_hidden_doors;
}

function Card() {
    this.type =  Type.deus;
    this.image = null;
    this.stats = new Stats();
    
    var ego = this;
    
    this.setImage = function(image_url) {
        ego.image = new Image();
        ego.image.src = image_url;
    };
    
    this.setType = function( type ) {
          ego.type = type;
    };
    
    this.setStat = function( stat ) {
        if( stat !== undefined && stat !== null )
            CardDescriptionParse(ego.stats,stat);
    };
}
//00001W-AQKNPZ-DB2PP9-ZNJGQQ-MWR1T0-J1NF7K-4PHYXD-UB9QRN-YATXMA-E0RQ7V-HUB9FG
function CardDescriptionParse(stat,str) {

    //alert(str)

    str.trim();
    var str_stats = str.split(';');
    var parsed_string = {};
    
    var length = str_stats.length; 
    var sub_string;
    for( var i = 0; i < length; i++ )
    {
        sub_string = str_stats[i].split(':');
        
        parsed_string[sub_string[0]] = sub_string[1];
    }
    stat.level = parseInt(parsed_string.level, 10);
   
    if( parsed_string.min_atack !== undefined && parsed_string.max_atack !== undefined )
    {
        stat.min_atack = parseInt(parsed_string.min_atack, 10);
        stat.max_atack = parseInt(parsed_string.max_atack, 10);
    }
}

function CardsPack(adress_prefix,image_postfix,text_postfix,numbers,type) {
    this.cards = [];
    this.cards_indexes = [];
    for( var i = 0; i < numbers; i++ )
    {
        var card = new Card();
        card.setType(type);
        var image_adress = adress_prefix + i + image_postfix;
        
        card.setImage(image_adress);
        
        var description_adress = adress_prefix + i + text_postfix;

        $.get(description_adress, card.setStat);
        this.cards.push( card );
        this.cards_indexes.push(i);
    }
    this.GetCard = function() {
        
        if( this.cards_indexes.length == 0 )
        {
             for( var i = 0; i < numbers; i++ )
                this.cards_indexes.push(i);
        }
        
        var i =  Math.floor( 10000 * Math.random() )%( this.cards_indexes.length );
        
        var choosed_cards_index = this.cards_indexes[i];
        
        
        this.cards_indexes.splice(i,1);
        return this.cards[ choosed_cards_index ];
        
    };
}

var Proffesions = new CardsPack( 'img/proff/p_', '.jpg','.txt', 4, Type.proffesion );
var Races = new CardsPack( 'img/races/', '.jpg','.txt', 5, Type.race );
var Armors = new CardsPack( 'img/treasure/armor/a_', '.jpg','.txt', 2, Type.armor );
var Weapons = new CardsPack( 'img/treasure/weapon/w_', '.jpg','.txt', 2, Type.weapon );
var Helmets = new CardsPack( 'img/treasure/helmet/h_', '.jpg','.txt', 1, Type.helmet );
var Boots = new CardsPack( 'img/treasure/boots/b_', '.jpg','.txt', 2, Type.boots );
var Locations = new CardsPack( 'img/locations/l_', '.jpg','.txt', 22, null );
var Enemys = new CardsPack( 'img/enemys/e_', '.jpg','.txt', 4, null );

var NotEmptyPacks = [0,1,2,3,4,5];
function GetCardFromPack() {
    
    
    var i =  Math.floor( 1000000 * (Math.random()+1) )%( NotEmptyPacks.length );
    
    switch(NotEmptyPacks[i])
    {
        case 0: 
            return Races.GetCard();
        case 1: 
            return Armors.GetCard();
        case 2: 
            return Proffesions.GetCard();
        case 3:
            return Weapons.GetCard();
        case 4:
            return Helmets.GetCard();
        default:
            return Boots.GetCard();
    }
    
}
