
function Header({currentPlayer}){

    return(
        <div style={styles.headerCenteredView}>
            <h3 style={styles.text}>It is {currentPlayer}'s turn.</h3>
        </div>
    )
}

function Cell({i, icon, handleCellClicked}){

    function drawCell(){
        let cellStyle = {
            width: 50,
            height: 50,
            display: "grid",
            justifyContent: "center",
            alignItems: "center"
        };

        if(i<3){
            cellStyle.borderBottom = "solid"
            cellStyle.borderBottomColor = "black";
            cellStyle.borderBottomWidth = 2;
        }
        if(i % 3 === 0){
            cellStyle.borderRight = "solid"
            cellStyle.borderRightColor = "black";
            cellStyle.borderRightWidth = 2;
        }
        if(i % 3 === 2){
            cellStyle.borderLeft = "solid"
            cellStyle.borderLeftColor = "black";
            cellStyle.borderLeftWidth = 2;
        }
        if(i>5){
            cellStyle.borderTop = "solid"
            cellStyle.borderTopColor = "black";
            cellStyle.borderTopWidth = 2;
        }

        return cellStyle;
    }


    return (
        <div style={drawCell()} onClick={()=>handleCellClicked(i)}>
            {icon}
        </div>
    )
}

function GameOverModal({winner, resetGame, drawStatus}){

    return (
        <div>
            <div
                style={styles.modalView}
            >
                <div style={styles.centeredView}>
                    <div style={styles.modalView}>
                        <div style={styles.heading}>Game Over</div>
                        {!drawStatus ? <div>{winner} Won!!</div> : <div>It was a draw!</div>}
                        <div style={styles.modalRow}>
                            <button
                                style={styles.playAgainButton}
                                onClick={()=>resetGame()}
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlayBoard({currentIcon, setCurrentIcon, setGameOver, gameOver, setDrawStatus, icons, setIcons, gameState, setGameState }){

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClicked(i){

        let gState = gameState;

        if(gState[i] === "" && !gameOver){
            gState[i] = currentIcon;
            setGameState(gState);
            redoIcons(gameState);
            checkForWin(gameState);
        }
    }

    function redoIcons(newGameState){

        let newIcons = []
        for(let index in newGameState){
            newIcons[index] = chooseIcon(newGameState[index])
        }
        setIcons(newIcons);
    }

    function changeActiveIcon(){
        if(currentIcon === "x"){
            setCurrentIcon("o");
        }else{
            setCurrentIcon("x");
        }
    }

    function checkForWin(){
        let won = false;
        for(let i = 0; i<8; i++){
            const winCond = winConditions[i];
            let a = gameState[winCond[0]];
            let b = gameState[winCond[1]];
            let c = gameState[winCond[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                won = true;
                break
            }
        }

        if(won){
            setGameOver(true)
            return;
        }
        if(!gameState.includes("")){
            setDrawStatus(true);
            setGameOver(true)
        }
        else{
            changeActiveIcon();
        }
    }

    function chooseIcon(cellState){
        if(cellState === ""){
            return <div ></div>
        }
        if(cellState === "x"){
            return <h4 className={"font-weight-bold"}>X</h4>
        }
        if(cellState === "o"){
            return <h4 className={"font-weight-bold"}>O</h4>
        }
    }

    return (
        <div style={styles.PlayField}>
            <div style={styles.Row}>
                <Cell i={0} icon={icons[0]} handleCellClicked={handleCellClicked} />
                <Cell i={1} icon={icons[1]} handleCellClicked={handleCellClicked} />
                <Cell i={2} icon={icons[2]} handleCellClicked={handleCellClicked} />
            </div>
            <div style={styles.Row}>
                <Cell i={3} icon={icons[3]} handleCellClicked={handleCellClicked} />
                <Cell i={4} icon={icons[4]} handleCellClicked={handleCellClicked} />
                <Cell i={5} icon={icons[5]} handleCellClicked={handleCellClicked} />
            </div>
            <div style={styles.Row}>
                <Cell i={6} icon={icons[6]} handleCellClicked={handleCellClicked} />
                <Cell i={7} icon={icons[7]} handleCellClicked={handleCellClicked} />
                <Cell i={8} icon={icons[8]} handleCellClicked={handleCellClicked} />
            </div>
        </div>
    )
}

function TicTacToe(){

    const players = ["x", "o"]
    const [gameOver, setGameOver] = React.useState(false);
    const [drawStatus, setDrawStatus] = React.useState(false);

    const [currentPlayer, setCurrentPlayer] = React.useState(players[0])
    const [currentIcon, setCurrentIcon] = React.useState("x")

    const [icons, setIcons] = React.useState([<div/>,<div/>,<div/>,<div/>,<div/>,<div/>,<div/>,<div/>])
    const [gameState, setGameState] = React.useState(["", "", "", "", "", "", "", "", ""]);

    React.useEffect(()=>{
        setCurrentPlayer(getPlayerName())
    }, [currentIcon])

    function getPlayerName(){
        if (currentIcon==="x"){
            return players[0];
        }
        else if (currentIcon==="o"){
            return players[1];
        }
        else{
            return "";
        }
    }

    function resetGame(){
        setGameOver(false);
        setDrawStatus(false);
        setIcons([<div/>,<div/>,<div/>,<div/>,<div/>,<div/>,<div/>,<div/>]);
        setGameState(["", "", "", "", "", "", "", "", ""]);
        setCurrentIcon("x");
    }

    return (
        <div className={"d-block text-center justify-content-center"}>
            <Header
                currentPlayer={currentPlayer}
            />
            {
                gameOver ?
                    <GameOverModal
                        winner={currentPlayer}
                        drawStatus={drawStatus}
                        resetGame={resetGame}
                    />
                    :
                    <PlayBoard
                        gameOver={gameOver}
                        setGameOver={setGameOver}
                        currentIcon={currentIcon}
                        setCurrentIcon={setCurrentIcon}
                        icons={icons}
                        setIcons={setIcons}
                        gameState={gameState}
                        setGameState={setGameState}
                        setDrawStatus={setDrawStatus}
                    />
            }
        </div>
    )
}

const styles = {
    PlayField:{
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    Row: {
        display: "flex",
        justifyContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView:{
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",
        zIndex: 1
    },
    heading: {
        fontSize: 30
    },
    modalRow:{
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row"
    },
    playAgainButton: {
        marginLeft: 5,
        marginRight:5,
        width: 100,
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#5ecbe0",
        padding: 10
    },
    quitButton:{
        marginLeft: 5,
        marginRight: 5,
        width: 100,
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#d16464",
        padding: 10
    },
    headerCenteredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop:10
    }
}

const container = document.getElementById('ticTacToeComponent');
const root = ReactDOM.createRoot(container);
root.render(<TicTacToe />)