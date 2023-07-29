import React from "react";
import Task from "./Task.jsx";

export default function TaskList(props) {
    return(
        <>
            {props.tasks.map((value,key) => <div key={key} className={`task-card${props.dm ? " cdark" : ""}`}>
                <Task id={value.id}
                      title={value.title}
                      description={value.desc}
                      date={value.date}
                      isImp={value.isImportant}
                      isCom={value.isCompleted}
                      delete={props.delete}
                      changeImp={props.changeImp}
                      changeComp={props.changeComp}
                      edit={props.edit}
                      dm={props.dm}
                />
            </div>)}
        </>
    )
}