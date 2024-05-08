import Box from "./box";
import React, { useEffect, useState } from "react";
import "./board.css";
import io from "socket.io-client"

const socket = io('http://localhost:4000')

const Board = () => {
    const [count, setCount] = useState(Array(9).fill(null));
    // const [winner, setWinner] = useState("");
    const [xtern, setXtern] = useState(true);
    const [p1, setP1] = useState(0);
    const [p2, setP2] = useState(0);

    useEffect(() => {
        socket.on('initial_state', (data) => {
            setCount(data);
        });
        socket.on('move', (data) => {
            setCount(data);
        });
    })

    const handleClick = (index: number) => {
        const copystate = [...count];

        const roomId = localStorage.getItem("room")

        socket.emit('move', { roomId, index });
        if (xtern && copystate[index] === null) {
            copystate[index] = "X";
            setXtern(false);
        } else if (copystate[index] === null && !xtern) {
            copystate[index] = "0";
            setXtern(true);
        }

        setCount(copystate);
    };
    const checkWinner = () => {
        const winPosibleon = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [6, 4, 2],
        ];
        for (const chance of winPosibleon) {
            const [a, b, c] = chance;

            if (count[a] !== null && count[a] === count[b] && count[a] === count[c]) {
                if (xtern === true) {
                    setP2(p2 + 1);
                } else {
                    setP1(p1 + 1);
                }
                return true;
            }
        }
    };

    // cheack if it draw or not
    if (count.every((el) => el !== null)) {
        setCount(Array(9).fill(null));
    }



    const isWinner = checkWinner();

    if (isWinner) {
        setCount(Array(9).fill(null));
    }



    return (
        <div className="container">

            <h2 className="turn">Now turn {xtern ? "x" : "0"}</h2>
            <div className="board">
                <div className="row">
                    <Box value={count[0]} onclick={() => handleClick(0)} />
                    <Box value={count[1]} onclick={() => handleClick(1)} />
                    <Box value={count[2]} onclick={() => handleClick(2)} />
                </div>
                <div className="row">
                    <Box value={count[3]} onclick={() => handleClick(3)} />
                    <Box value={count[4]} onclick={() => handleClick(4)} />
                    <Box value={count[5]} onclick={() => handleClick(5)} />
                </div>
                <div className="row">
                    <Box value={count[6]} onclick={() => handleClick(6)} />
                    <Box value={count[7]} onclick={() => handleClick(7)} />
                    <Box value={count[8]} onclick={() => handleClick(8)} />
                </div>
            </div>
            <div className="point">
                <div className="p1">
                    <p className="Tex">p1</p>
                    <p className="score Tex">{p1}</p>
                </div>
                <div className="p1">
                    <p className="Tex">p2</p>
                    <p className="score Tex">{p2}</p>
                </div>
            </div>
        </div>
    );
}
export default Board;