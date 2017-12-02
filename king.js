
$(function(){
    $(window).resize();
    var cardHolder = $('.card-holder');
    var cards;
    newDeck();

    var playerOne = prompt("Name Player 1", "Vicky");
    $('.player-one .name input').val(playerOne);
    $('.player-one .name span').html(playerOne);
    var playerTwo = prompt("Name Player 2", "Jamie");
    $('.player-two .name input').val(playerTwo);
    $('.player-two .name span').html(playerTwo);

    $('.card-holder').on('click', '> div', function(){
        var thisCard = $(this);
        if( thisCard.hasClass('up') || thisCard.hasClass('down') || thisCard.hasClass('left') || thisCard.hasClass('right') ){ 
            var group = thisCard.attr('class').split(' ')[0];
            var actPlayerGroup = $('.player.active').find('div[data-group="'+group+'"]');
            var oppPlayerGroup = $('.player:not(.active)').find('div[data-group="'+group+'"]');
            var direction = thisCard.attr('class').split(' ')[1];
            var cardLine = $('.card-holder').find('.'+direction).get();
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
                    var addCard = checkCard.clone();
                    addCard.prependTo(actPlayerGroup);
                    newPawn = checkCard;
                }
            }

            if( actPlayerGroup.attr('data-count') >= oppPlayerGroup.attr('data-count') ){
                actPlayerGroup.addClass('lead');
                oppPlayerGroup.removeClass('lead');
            }

            $('.pawn').addClass('removed').removeClass('pawn');
            newPawn.attr('class','pawn');
            checkPawn();

            $(cardHolder).addClass('wait');
            setTimeout( function() {
                $('body').addClass('player-change');
                setTimeout( function() {
                    $('.player').toggleClass('active');
                    $(cardHolder).removeClass('wait');
                    $('body').removeClass('player-change');
                }, 200);
            }, 1000);
        }

    });
    $(cardHolder).on('click', '.new-game', function(){
        $('.player .tokens > div').attr('data-count',0).removeClass('lead');
        $('.tokens > div').empty();
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
            });
            cardDiv.appendTo( cardHolder );
        }

        checkPawn();
    }

    function checkPawn(){
        $('.card-holder > div').removeClass('up').removeClass('down').removeClass('left').removeClass('right');
        var pawn = $('.pawn');
        var pos = pawn.offset();
        var hitPawn = false;
        var moveAvailable = false;
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
                moveAvailable = true;
            } else if( card.offset().top == pos.top ){
                if( hitPawn ) {
                    card.addClass('right');
                } else {
                    card.addClass('left');
                }
                moveAvailable = true;
            }
        });
        if(moveAvailable == false){
            var actPlayerArea = $('.player.active');
            var oppPlayerArea = $('.player:not(.active)');
            var actWinCount = actPlayerArea.find('.lead').length;
            var oppWinCount = oppPlayerArea.find('.lead').length;
            var winnerName = "No one";
            if(actWinCount > oppWinCount){
                winnerName = actPlayerArea.find('.name input').val();
            } else if(actWinCount < oppWinCount){
                winnerName = oppPlayerArea.find('.name input').val();
            } else {
                var actTieCount = actPlayerArea.find('div[data-group="group-eight"] > div').length;
                var oppTieCount = oppPlayerArea.find('div[data-group="group-eight"] > div').length;
                if(actTieCount > oppTieCount){
                    winnerName = actPlayerArea.find('.name input').val();
                } else if(actTieCount < oppTieCount){
                    winnerName = oppPlayerArea.find('.name input').val();
                } else {
                    var actTieCount = actPlayerArea.find('div[data-group="group-seven"] > div').length;
                    var oppTieCount = oppPlayerArea.find('div[data-group="group-seven"] > div').length;
                    if(actTieCount > oppTieCount){
                        winnerName = actPlayerArea.find('.name input').val();
                    } else if(actTieCount < oppTieCount){
                        winnerName = oppPlayerArea.find('.name input').val();
                    } else {
                        var actTieCount = actPlayerArea.find('div[data-group="group-six"] > div').length;
                        var oppTieCount = oppPlayerArea.find('div[data-group="group-six"] > div').length;
                        if(actTieCount > oppTieCount){
                            winnerName = actPlayerArea.find('.name input').val();
                        } else if(actTieCount < oppTieCount){
                            winnerName = oppPlayerArea.find('.name input').val();
                        };
                    }

                }
            }
            winnerDiv = $('<div>', { 
                'class': 'winner',
                'html': winnerName + ' is<br/>the winner!'
            });
            winnerDiv.appendTo( cardHolder );

            newGame = $('<div>', { 
                'class': 'new-game',
                'html': 'New Game'
            });
            newGame.appendTo( winnerDiv );

            setTimeout( function(){
                winnerDiv.addClass('show');
            }, 1000);
        }
    }
});
$(window).resize(function(){
    $('html').height(window.innerHeight);
});