
$(document).ready(function () {
    var gameId;
    var bird1 = $('#bird1');
    var bird2 = $('#bird2');
    var pipe = $('.pipe');
    var startButton = $('#btnStart');
    var gameOver = false;



    startButton.click(function () {
        gameOver = false;
        var game = function () {
            if (gameOver) {
                stopGame();
                determineWinner();
                return;
            }

            var iteration1 = parseInt(bird1.css('left'));
            var iteration2 = parseInt(bird2.css('left'));
            console.log("Bird 1: " + iteration1 + ", Bird 2: " + iteration2);

            if (collision(bird1, pipe) || collision(bird2, pipe)) {
                gameOver = true;
            } else {
                var randomMovement1 = Math.floor(Math.random() * 3) + 1;
                var randomMovement2 = Math.floor(Math.random() * 3) + 1;
                bird1.css('left', iteration1 + randomMovement1);
                bird2.css('left', iteration2 + randomMovement2);
            }

            gameId = requestAnimationFrame(game);
        };

        gameId = requestAnimationFrame(game);
    });

    function stopGame() {
        if (gameId) {
            cancelAnimationFrame(gameId);
            gameId = null;
            startButton.prop('disabled', true); // Disable the START button
        }
    }

    function determineWinner() {
        var position1 = parseInt(bird1.css('left'));
        var position2 = parseInt(bird2.css('left'));

        if (position1 > position2) {
            alert("Player 1 Wins!");
        } else if (position2 > position1) {
            alert("Player 2 Wins!");
        } else {
            alert("It's a Tie!");
        }
    }

    function collision(duck, pipe) {
        var birdLeft = duck.offset().left;
        var birdWidth = duck.width();
        var birdRight = birdLeft + birdWidth;
        var pipeLeft = pipe.offset().left;
        var pipeWidth = pipe.width();
        var pipeRight = pipeLeft + pipeWidth;

        if (birdLeft < pipeRight) 
            return false;
        

        return true;
    }
});

function refreshPage() {
    window.location.reload();
}
