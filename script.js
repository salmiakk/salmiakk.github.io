var alphabet = ['A','B','C','D','E','F','G','H'];
var movingFieldId;
var tryingToMovePiece;
var blackPiecesImageUrls = {
    "king": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png",
    "queen": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png",
    "rook": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png",
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png",
    "knight": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"
};
var whitePiecesImageUrls = {
    "king": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png",
    "queen": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png",
    "rook": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png",
    "bishop": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png",
    "knight": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png",
    "pawn": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png"
};

function initBoard(){
    var boardTable = document.getElementsByTagName('TABLE')[0];
    var boardRow = [];
    var boardField = [];
    for (var i=8; i>0; i--){
        boardRow[i] = document.createElement('TR');
        boardRow[i].id = "row" + i;
        boardTable.appendChild(boardRow[i]);
        for(var j=1; j<=8; j++){
            boardField[i] = [];
            boardField[i][j] = document.createElement('TD');
            boardField[i][j].classList.add("field");
            boardField[i][j].id = "field".concat(alphabet[j-1]) + i;
            if(i%2 == 1 && j%2 == 1){
                boardField[i][j].setAttribute("fieldColor","black");
            }else if(i%2 == 1 && j%2 == 0){
                boardField[i][j].setAttribute("fieldColor","white");
            }else if(i%2 == 0 && j%2 == 0){
                boardField[i][j].setAttribute("fieldColor","black");
            }else if(i%2 == 0 && j%2 == 1){
                boardField[i][j].setAttribute("fieldColor","white");            
            }
            boardRow[i].appendChild(boardField[i][j]);
            console.log(boardField[i][j].getAttribute("fieldColor"));
    
        }
    }
    console.log(boardRow);    
}

function initPieces(){
    whitePiecesDivs = {};
    blackPiecesDivs = {};
    for (var i in whitePiecesImageUrls){
        whitePiecesDivs[i] = document.createElement('DIV');
        whitePiecesDivs[i].style.backgroundImage = 'url(' + whitePiecesImageUrls[i] + ')';
        whitePiecesDivs[i].classList.add("piece");
        whitePiecesDivs[i].setAttribute("pieceColor","white");
        whitePiecesDivs[i].setAttribute("pieceType",i);
        whitePiecesDivs[i].setAttribute("pieceColor","white");
        console.log(whitePiecesDivs[i]);
    }
    for (var i in blackPiecesImageUrls){
        blackPiecesDivs[i] = document.createElement('DIV');
        blackPiecesDivs[i].style.backgroundImage = 'url(' + blackPiecesImageUrls[i] + ')';
        blackPiecesDivs[i].classList.add("piece");
        blackPiecesDivs[i].setAttribute("pieceType",i);
        blackPiecesDivs[i].setAttribute("pieceColor","black");
        console.log(blackPiecesDivs[i].getAttribute("pieceType"));
    }
    
    // Black pieces
    
    $(blackPiecesDivs["rook"]).clone().appendTo("#fieldA8");
    $(blackPiecesDivs["rook"]).clone().appendTo("#fieldH8");    
    $(blackPiecesDivs["knight"]).clone().appendTo("#fieldB8");
    $(blackPiecesDivs["knight"]).clone().appendTo("#fieldG8");
    $(blackPiecesDivs["bishop"]).clone().appendTo("#fieldC8");
    $(blackPiecesDivs["bishop"]).clone().appendTo("#fieldF8");
    $(blackPiecesDivs["queen"]).clone().appendTo("#fieldD8");
    $(blackPiecesDivs["king"]).clone().appendTo("#fieldE8");
    // pawns
    $("#row2").children().append(whitePiecesDivs["pawn"]);

    // White pieces
    
    $(whitePiecesDivs["rook"]).clone().appendTo("#fieldA1");
    $(whitePiecesDivs["rook"]).clone().appendTo("#fieldH1");
    $(whitePiecesDivs["knight"]).clone().appendTo("#fieldB1");
    $(whitePiecesDivs["knight"]).clone().appendTo("#fieldG1");
    $(whitePiecesDivs["bishop"]).clone().appendTo("#fieldC1");
    $(whitePiecesDivs["bishop"]).clone().appendTo("#fieldF1");
    $(whitePiecesDivs["queen"]).clone().appendTo("#fieldD1");
    $(whitePiecesDivs["king"]).clone().appendTo("#fieldE1");
    // pawns
    
    $("#row7").children().append(blackPiecesDivs["pawn"]);

}
function removeFieldBackgroundAfterMove(field, possibleMoves){
    console.log($(field));
    $(field).css("background","");
    movingFieldId = null;
    possibleMoves.forEach(function(item,index){
        $("#field" + item).css("background","");
        console.log("#field" + item);
    });
}
function initPieceMove(field){
    // if already inited the move
    console.log(movingFieldId);
    console.log(field.attr('id'));

    if (movingFieldId != null){
        // if clicked again on the same piece
        if (movingFieldId == field.attr('id')){
            var possibleMoves = findMoves(field);
            console.log("szukalem wczesniej");
            console.log(field.attr("fieldColor"));
            removeFieldBackgroundAfterMove($(field), possibleMoves);
            return;
        }
        // if clicked on a field with another piece
        else{
            console.log($("#" + movingFieldId).children().first());
            
            var possibleMoves = findMoves($("#" + movingFieldId));
            
            console.log(field.attr("id").slice(-2));
            console.log(possibleMoves);
            if (possibleMoves.includes(field.attr("id").slice(-2))){
                console.log("OK");
                movePiece($("#" + movingFieldId).children().first(), field);
                console.log(field);
                removeFieldBackgroundAfterMove($("#" + movingFieldId), possibleMoves);
                return;
            }
            console.log("You shall not pass");
            return -1;
        }
    }else{
        var possibleMoves = findMoves(field);
        console.log("nie szukałem ruchow wczesniej");
        console.log($(field).attr("fieldColor"));
        $(field).css("background","rgba(102, 193, 92, 1)");
        movingFieldId = field.attr('id');
        console.log(possibleMoves);
        possibleMoves.forEach(function(item,index){
            $("#field" + item).css("background","rgba(102, 193, 92, 1)");
            console.log("#field" + item);
        });
        
        console.log(" RUCH PIONKA:" + movingFieldId);
    }
}

function findMoves(piece){
    var pieceType = $(piece).children().first().attr("pieceType");
    var pieceColor = $(piece).children().first().attr("pieceColor");
    var moveDivSelectors = [];
    var takeDivSelectors = [];
    var moves = [];
    console.log(piece);
    console.log("piece color:" + pieceColor);
    pieceRow = parseInt($(piece).attr("id")[6]);
    pieceColumn = $(piece).attr("id")[5];
    console.log(pieceRow);
    console.log(pieceColumn);
    
    if (pieceColor == "black"){
        switch(pieceType){
            case "pawn":
                // jeden do przodu, lub dwa
                // po skosie
                var pieceColumnAscii = pieceColumn.charCodeAt(0);
                console.log(pieceColumnAscii);
                
                console.log($("#field" + String.fromCharCode(pieceColumnAscii + 1) + (pieceRow - 1)).children());
                // w dol w prawo
                
                moveDivSelectors = [
                    $("#field" + pieceColumn + (pieceRow - 1))
                ];
                takeDivSelectors = [
                    $("#field" + String.fromCharCode(pieceColumnAscii + 1) + (pieceRow - 1)),
                    $("#field" + String.fromCharCode(pieceColumnAscii - 1) + (pieceRow - 1))
                ]
                if (pieceRow == 7){
                    // dwa do przodu
                    moveDivSelectors.push($("#field" + pieceColumn + (pieceRow - 2)));
                }
                moveDivSelectors.forEach(function(item,index){
                    if(item.children().length == 0){
                        moves.push(item.attr("id").slice(-2));
                    }
                });
                takeDivSelectors.forEach(function(item,index){
                    if(item.children().length != 0 && item.children().first().attr("pieceColor") != pieceColor){
                        moves.push(item.attr("id").slice(-2));
                    }
                });
                
                break;
        }
    }
    
    // białe
    else{
        switch(pieceType){
            case "pawn":
           // jeden do przodu, lub dwa
                // po skosie
                var pieceColumnAscii = pieceColumn.charCodeAt(0);
                console.log(pieceColumnAscii);
                
                console.log($("#field" + String.fromCharCode(pieceColumnAscii + 1) + (pieceRow + 1)).children());
                // w gore w prawo
                
                moveDivSelectors = [
                    $("#field" + pieceColumn + (pieceRow + 1))
                ];
                takeDivSelectors = [
                    $("#field" + String.fromCharCode(pieceColumnAscii + 1) + (pieceRow + 1)),
                    $("#field" + String.fromCharCode(pieceColumnAscii - 1) + (pieceRow + 1))
                ]
                if (pieceRow == 2){
                    // dwa do przodu
                    moveDivSelectors.push($("#field" + pieceColumn + (pieceRow + 2)));
                }
                moveDivSelectors.forEach(function(item,index){
                    if(item.children().length == 0){
                        moves.push(item.attr("id").slice(-2));
                    }
                });
                takeDivSelectors.forEach(function(item,index){
                    if(item.children().length != 0 && item.children().first().attr("pieceColor") != pieceColor){
                        moves.push(item.attr("id").slice(-2));
                    }
                });
                
                break;
        }
    }
    return moves;
}

function movePiece(piece, newField){
    if (newField.children() != 0){
        newField.children().first().remove();
    }
    piece.appendTo(newField);   
}



initBoard();
initPieces();

$(".piece").click(function(){
        var result = initPieceMove($(this).parent());
        if (result != -1) tryingToMovePiece = $(this);

});
$(".field").click(function(){
    if ($(this).children().length == 0){
        console.log("Kliknales na pole bez pionka");
        console.log(movingFieldId);
        if (movingFieldId != null){
            var possibleMoves = findMoves($("#" + movingFieldId));
            console.log("co mozesz: " + possibleMoves);
            console.log("twoje id: " + $(this).attr("id"));
            if (possibleMoves.includes($(this).attr("id").slice(-2))){
                console.log("mamy zielen!");
                movePiece(tryingToMovePiece, $(this));
                removeFieldBackgroundAfterMove($("#" + movingFieldId), possibleMoves);
                tryingToMovePiece = null;
                movingFieldId = null;
            }
        }
    }
});
