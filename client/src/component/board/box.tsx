import React from "react";
import "../board/board.css";

interface BoxProps {
    value: string;
    onclick: () => void;
}

const Box: React.FC<BoxProps> = (props) => {
    return (
        <>
            <div className="box" onClick={props.onclick}>
                <h1 className="text">{props.value}</h1>
            </div>
        </>
    );
};
export default Box;