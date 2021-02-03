import React, { useEffect, useRef, useState } from 'react'
import HEAD_UP from '../../../../assets/kids_space/snake/head_up.png'
import HEAD_DOWN from '../../../../assets/kids_space/snake/head_down.png'
import HEAD_LEFT from '../../../../assets/kids_space/snake/head_left.png'
import HEAD_RIGHT from '../../../../assets/kids_space/snake/head_right.png'
import BODY_H from '../../../../assets/kids_space/snake/body_h.png'
import BODY_V from '../../../../assets/kids_space/snake/body_v.png'
import CURVE_DL from '../../../../assets/kids_space/snake/curve_dl.png'
import CURVE_DR from '../../../../assets/kids_space/snake/curve_dr.png'
import CURVE_UL from '../../../../assets/kids_space/snake/curve_ul.png'
import CURVE_UR from '../../../../assets/kids_space/snake/curve_ur.png'
import RABA_UP from '../../../../assets/kids_space/snake/raba_up.png'
import RABA_DOWN from '../../../../assets/kids_space/snake/raba_down.png'
import RABA_LEFT from '../../../../assets/kids_space/snake/raba_left.png'
import RABA_RIGHT from '../../../../assets/kids_space/snake/raba_right.png'
import './style.css'

// Snake
const SNAKE_SPEED = 250

const BoardGame: React.FC = () => {
    const gameBoard = useRef <HTMLDivElement | null> (null)

    // General attirbutes
    const [gameOver, setGameOver] = useState(false)

    // Snake
    const [snakeBody, setSnakeBody] = useState([{ x: 11, y: 11 }, {x: 11, y: 12}])
    const [grow, setGrow] = useState(false)
    const [started, setStarted] = useState(false)

    const [inputDirection, setInputDirection] = useState({x: 0, y: 0, d:'N'})
    const [lastInputDirection, setLastInputDirection] = useState({x: 0, y: 0, d:'N'})

    const [xDown, setXDown] = useState<number | null>(null)                                                        
    const [yDown, setYDown] = useState<number | null>(null)

    const [snakeTimeout, setSnakeTimeout] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // main(currentTime): main function of the game; organizes and set everything needded
        function main() {
            // Verify if is a game over scenario
            if(gameOver) {
                /*
                // Check if the user would like to restart the game
                restartDialog.showModal()
                confirmButton.addEventListener('click', () => {
                    window.location = '/'
                })
                cancelButton.addEventListener('click', () => {
                    restartDialog.close()
                })
                */
                return
            } else {
                // Update and render the game
                update()
                render()
                const timeout = setTimeout(main, SNAKE_SPEED)
                setSnakeTimeout(timeout)
            }
        }

        // update(): update the food and the snake if necessary
        function update() {
            updateSnake()
            //updateFood()
            //checkDeath()
        }

        // render(): render the snake, the food and the current score
        function render() {
            //scoreBoard.innerHTML = `<p>${score}</p>`
            //gameBoard.innerHTML = ''
            //renderFood(gameBoard)
        }

        // checkDeath(): verify if some condition of game over was reached
        function checkDeath() {
            //setGameOver(outsideGrid() || snakeOverItself())
        }

        // updateSnake(): update the snake vector with the new segment position at each time interval
        function updateSnake() {
            if(grow) {
                addSegments()
            }
            // Get the head direction (changed by the user)
            const inputDirection = getInputDirection()

            // Update the array -> the current segment gets the position of the previous segment
            for (let i = snakeBody.length - 2; i >= 0; i--) {
                snakeBody[i + 1] = { ...snakeBody[i] }
            }

            /* BUG */
            // Gambiarra: o jogo buga quando tem mais de um segmento inicial
            if(!started) {
                if(!(inputDirection.x === 0 && inputDirection.y === 0)) {
                    setStarted(true)
                } else {
                    if(snakeBody.length === 2){
                        snakeBody[1].y = 12
                    }
                }
            }

            // Update the head position
            snakeBody[0].x += inputDirection.x
            snakeBody[0].y += inputDirection.y
        }

        // addSegments(): add a new segment on the snake array and sets the boolean grow to false
        function addSegments() {
            snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
            setGrow(false)
        }

        // getInputDirection(): gets the head direction based on the user moves
        //  output: inputDirection -> {x , y , direction } : direction of the movement
        function getInputDirection() {
            setLastInputDirection(inputDirection)
            return inputDirection
        }

        if (snakeTimeout === null) {
            const timeout = setTimeout(main, SNAKE_SPEED)
            setSnakeTimeout(timeout)
        }

        const cleanBeforeUpdate = () => {
            if (snakeTimeout !== null) {
                clearTimeout(snakeTimeout)
                setSnakeTimeout(null)
            }
        }

        return cleanBeforeUpdate
    }, [gameOver, grow, inputDirection, snakeBody, snakeTimeout, started])
    
    useEffect(() => {
        function onTouchStart(evt: TouchEvent) {
            const firstTouch = evt.touches[0]

            setXDown(firstTouch.clientX)                                   
            setYDown(firstTouch.clientY)                                   
        }

        function onTouchMove(evt: TouchEvent) {
            if ( ! xDown || ! yDown ) {
                return
            }

            let xUp = evt.touches[0].clientX                                  
            let yUp = evt.touches[0].clientY

            // Get the most significant movement
            if ( Math.abs( xDown - xUp ) < Math.abs( yDown - yUp ) ) {
                // Up swipe
                if (( yDown - yUp > 0 ) && (lastInputDirection.y === 0)){
                    setInputDirection({x: 0, y: -1, d:'U'})
                // Down swipe
                } else if(lastInputDirection.y === 0){
                    setInputDirection({x:0, y: 1, d:'D'})
                }             
            } else {
                // Left swipe
                if ((xDown - xUp > 0) && (lastInputDirection.x === 0)) {
                    setInputDirection({x: -1, y: 0, d:'L'})
                // Right swipe
                } else if(lastInputDirection.x === 0){
                    setInputDirection({x: 1, y: 0, d:'R'})
                }                                                                   
            }

            // Reset values
            setXDown(null)
            setYDown(null)                                          
        }

        /* --> Event Listeners <-- */
        // Activated when an user touches the screen
        document.addEventListener('touchstart', onTouchStart, false)

        // Activated when an user moves the finger along the screen
        document.addEventListener('touchmove', onTouchMove, false)

        function cleanBeforeUpdate() {
            document.removeEventListener('touchstart', onTouchStart, false)
            document.removeEventListener('touchmove', onTouchMove, false)
        }

        return cleanBeforeUpdate
    }, [lastInputDirection.x, lastInputDirection.y, xDown, yDown])

    function getInputDirection() {
        setLastInputDirection(inputDirection)
        return inputDirection
    }

    // getCorrectImage(index): get the correct asset based on the position of the current and adjacent segments
    function getCorrectImage(index: number): string {
        // Segment is a head
        if(index === 0) {
            switch(inputDirection.d){
                case 'D':
                    return HEAD_DOWN
                case 'L':
                    return HEAD_LEFT
                case 'R':
                    return HEAD_RIGHT
                default:
                    return HEAD_UP
            }
            
        // Segment is a tail
        } else if(index === snakeBody.length - 1){
            if(snakeBody[index - 1].x > snakeBody[index].x) {
                return RABA_LEFT
            } else if(snakeBody[index - 1].x < snakeBody[index].x) {
                return RABA_RIGHT
            } else if(snakeBody[index - 1].y > snakeBody[index].y) {
                return RABA_UP
            } else {
                return RABA_DOWN
            }
            
        // Segment is in the between
        } else {
            // Straight piece
            if(snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index].x === snakeBody[index + 1].x) {
                return BODY_V
            } else if(snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index].y === snakeBody[index + 1].y) {
                return BODY_H
            // Curved piece
            } else {
                if((snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index - 1].x === (snakeBody[index].x - 1) && snakeBody[index].x === snakeBody[index + 1].x && snakeBody[index].y === (snakeBody[index + 1].y - 1)) || 
                    (snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index].y === (snakeBody[index - 1].y - 1) && snakeBody[index].y === snakeBody[index + 1].y && snakeBody[index + 1].x === (snakeBody[index].x - 1))) {
                    return CURVE_DL
                } else if((snakeBody[index - 1].x === snakeBody[index].x && snakeBody[index - 1].y === (snakeBody[index].y + 1) && snakeBody[index].y === snakeBody[index + 1].y && snakeBody[index].x === (snakeBody[index + 1].x - 1)) ||
                    (snakeBody[index - 1].y === snakeBody[index].y && snakeBody[index].x === (snakeBody[index - 1].x - 1) && snakeBody[index].x === snakeBody[index + 1].x && snakeBody[index + 1].y === (snakeBody[index].y + 1))) {
                        return CURVE_DR
                } else if(snakeBody[index - 1].x === (snakeBody[index].x - 1) || snakeBody[index + 1].x === (snakeBody[index].x - 1)) {
                    return CURVE_UL
                }else {
                    return CURVE_UR
                }
            }
        }
    }

    return (
        <div ref= { gameBoard } className='snake_game__game_board'>
            {snakeBody.map((segment, index) => (
                <img 
                    className='snake'
                    src={getCorrectImage(index)  } 
                    style={{
                        gridRowStart: segment.y.toString(), 
                        gridColumnStart: segment.x.toString()}
                    } 
                />
            ))}
        </div>
    )
}

export default BoardGame