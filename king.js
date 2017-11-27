var cards;

$(function(){
    var cardHolder = $('.card-holder');
    newDeck();

    $('.card-holder').on('click', '> div', function(){
        var thisCard = $(this);
        if( thisCard.hasClass('up') || thisCard.hasClass('down') || thisCard.hasClass('left') || thisCard.hasClass('right') ){ 
            var group = thisCard.attr('class').split(' ')[0];
            var actPlayerGroup = $('.player.active').find('.'+group);
            var oppPlayerGroup = $('.player:not(.active)').find('.'+group);
            var direction = thisCard.attr('class').split(' ')[1];
            var cardLine = $('.'+direction).get();
            var newPawn = thisCard;
            if( direction == 'up' || direction == 'left' ){
                cardLine = cardLine.reverse();
            }
            for (var x = 0; x<cardLine.length; x++){
                var checkCard = $(cardLine[x]);
                if(checkCard.hasClass(group)){
                   actPlayerGroup.attr('data-count', 
                        parseInt(actPlayerGroup.attr('data-count')) + 1 
                    );
                    checkCard.addClass('removed');
                    newPawn = checkCard;
                }
            }

            if( actPlayerGroup.attr('data-count') >= oppPlayerGroup.attr('data-count') ){
                console.log('she takes the lead!');
                actPlayerGroup.addClass('lead');
                oppPlayerGroup.removeClass('lead');
            }

            $('.pawn').addClass('removed').removeClass('pawn');
            newPawn.attr('class','pawn');
            checkPawn();
            $('.player').toggleClass('active');
        }

    });
    $('.new-game').click( function(){
        $('.player .tokens > div').attr('data-count',0).removeClass('lead');
        newDeck();
    });

    function newDeck(){
        cards = [];

        for (var c = 0; c<8; c++){
            var cardClass = "group-eight";
            cards.push(cardClass);
        }
        for (var c = 0; c<7; c++){
            var cardClass = "group-seven";
            cards.push(cardClass);
        }
        for (var c = 0; c<6; c++){
            var cardClass = "group-six";
            cards.push(cardClass);
        }
        for (var c = 0; c<5; c++){
            var cardClass = "group-five";
            cards.push(cardClass);
        }
        for (var c = 0; c<4; c++){
            var cardClass = "group-four";
            cards.push(cardClass);
        }
        for (var c = 0; c<3; c++){
            var cardClass = "group-three";
            cards.push(cardClass);
        }
        for (var c = 0; c<2; c++){
            var cardClass = "group-two";
            cards.push(cardClass);
        }
        cards.push("pawn");

        cards = cards.reduce((a,v)=>a.splice(Math.floor(Math.random() * a.length), 0, v) && a, []);

        cardHolder.empty();
        
        for (var i = 0; i<cards.length; i++){
            cardDiv = $('<div>', { 
                'class': cards[i]
            }).append( $('<div>') );
            cardDiv.appendTo( cardHolder );
        }

        checkPawn();
    }

    function checkPawn(){
        $('.card-holder > div').removeClass('up').removeClass('down').removeClass('left').removeClass('right');
        var pawn = $('.pawn');
        var pos = pawn.offset();
        var hitPawn = false;
        $('.card-holder > div:not(".removed")').each( function(a,b){
            card = $(b);
            if( card.hasClass('pawn') ){
                hitPawn = true;
            } else if( card.offset().left == pos.left ){
                if( hitPawn ) {
                    card.addClass('down');
                } else {
                    card.addClass('up');
                }
            } else if( card.offset().top == pos.top ){
                if( hitPawn ) {
                    card.addClass('right');
                } else {
                    card.addClass('left');
                }
            }
        });
    }
});