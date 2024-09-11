var state = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

var plaveMove = false;

if (plaveMove) {
    makeMove();
}

function restartGame() {
    state = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    plaveMove = false;
    updateMove();
}

$(document).ready(function() {
    $("button").click(function() {
        var tile = $(this).attr("id")
        var row = parseInt(tile[1])
        var col = parseInt(tile[2])
        if (!plaveMove) {
            state[row][col] = false;
            plaveMove = true;
            updateMove();
            makeMove();
        }
    });
    $("#restart").click(restartGame);
});

function updateMove() {
    updateButtons();

    var winner = getWinner(state);

    $("#winner").text(winner == 1 ? "AI Won!" : winner == 0 ? "You Won!" : winner == -1 ? "Tie!" : "");

}

function getWinner(state) {

    // Check if someone won
    vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];

        // Check rows, columns, and diagonals
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
        for (var i = 0; i < 3; i++) {
            if (state[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (state[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
            for (var j = 0; j < 3; j++) {
                if (state[i][j] != value) {
                    rowComplete = false;
                }
                if (state[j][i] != value) {
                    colComplete = false;
                }
                if (state[i][j] == null) {
                    allNotNull = false;
                }
            }
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
    if (allNotNull) {
        return -1;
    }
    return null;
}

var playerSign = "X";
var compSign = "O";

$("#turnx").click(function() {
    playerSign = "O";
    compSign = "X";
    $("#turnx").removeClass("btn-primary");
    $("#turno").addClass("btn-primary");
    reset();
});

$("#turno").click(function() {
    playerSign = "X";
    compSign = "O";
    $("#turno").removeClass("btn-primary");
    $("#turnx").addClass("btn-primary");
    reset();
});

function updateButtons() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $("#c" + i + "" + j).text(state[i][j] == false ? playerSign : state[i][j] == true ? compSign : "");
        }
    }
}

function makeMove() {
    state = computer(state);
    console.log(nodes);
    plaveMove = false;
    updateMove();
}

function computer(state) {
    nodes = 0;
    return ai(state, true)[1];
}

var nodes = 0;

function ai(state, player) {
    nodes++;
    var winner = getWinner(state);
    if (winner != null) {
        switch (winner) {
            case 1:
                // AI wins
                return [1, state]
            case 0:
                // opponent wins
                return [-1, state]
            case -1:
                // Tie
                return [0, state];
        }
    } else {
        // Next states
        var nextTurn = null;
        var nextstate = null;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (state[i][j] == null) {
                    state[i][j] = player;
                    var value = ai(state, !player)[0];
                    if ((player && (nextTurn == null || value > nextTurn)) || (!player && (nextTurn == null || value < nextTurn))) {
                        nextstate = state.map(function(arr) {
                            return arr.slice();
                        });
                        nextTurn = value;
                    }
                    state[i][j] = null;
                }
            }
        }
        return [nextTurn, nextstate];
    }
}
updateMove();