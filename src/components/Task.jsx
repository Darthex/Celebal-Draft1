import React from "react";
import star from "../assets/star.png"
import starDark from "../assets/starDark.png"
import star2 from "../assets/star (1).png"
import dots from "../assets/dots.png"
import dotsDark from "../assets/dotsDark.png"
import bin from "../assets/trash-bin.png"
import binDark from "../assets/trash-binDark.png"

export default function Task(props) {
    return(
        <div className="task">
            <div className="task-heading">
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                </div>
                <div>
                    <p>{props.date}</p>
                </div>
            </div>
            <hr />
            <div className="task-tags">
                {/*<p className="tag">{props.isCom ? "Completed" : "InComplete"}</p>*/}
                <div className={props.isCom ? "tag" : "untag"} onClick={() => props.changeComp(props.id)}><p>{props.isCom ? "Completed" : "Uncompleted"}</p></div>
                <div className="functions">
                    <img src={props.isImp ? star2 : props.dm ? starDark : star} alt="" className="function-icons" onClick={() => props.changeImp(props.id)}/>
                    <img src={props.dm ? binDark : bin} alt="" className="function-icons" onClick={() => props.delete(props.id)}/>
                    <img src={props.dm ? dotsDark : dots} alt="" className="function-icons" onClick={() => props.edit(props.id, props.title, props.description, props.date, props.isImp, props.isCom)}/>
                </div>
            </div>
        </div>
    )
}