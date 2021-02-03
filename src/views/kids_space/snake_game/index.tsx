import React from "react"
import PathConstants from "../../../constants/app/PathConstants"
import HistoryService from "../../../services/history/HistoryService"
import BoardGame from "./board"

const SnakeGame: React.FC = () => {
    console.log("snake game")
    return(
        <>  
            <BoardGame />
            <button onClick = {() => {HistoryService.push(PathConstants.GAME_MENU)}}> Clica ae </button>
        </>
    )
}

export default SnakeGame