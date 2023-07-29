import React from "react";
import TaskList from "./components/TaskList.jsx";
import close from "./assets/close.png"
import bell from "./assets/bell.png"
import Card from "./assets/menu.png"
import cardSelected from "./assets/menuSelected.png"
import list from "./assets/list.png"
import listSelected from "./assets/listSelected.png"
import {nanoid} from "nanoid";
import dp from "./assets/dp.jpg"

export default function App() {
    const [darkMode, setDarkMode] = React.useState(false)
    const [view, setView] = React.useState("Card")
    const [idEdit, setIdEdit] = React.useState()
    const [tasks, setTasks] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [overlay, setOverlay] = React.useState(false)
    const [edit, setEdit] = React.useState(false)
    const [content, setContent] = React.useState({
        title: "",
        date: "",
        description: "",
        isImportant: false,
        isCompleted: false
    })
    const date = new Date()

    React.useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('celebal-draft-1'))
        if (savedData) {
            setTasks(savedData)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem('celebal-draft-1', JSON.stringify(tasks))
    }, [tasks])

    function handleDarkMode() {
        setDarkMode(prevState => !prevState)
    }

    function handleOverlay() {
        setOverlay(prevState => !prevState)
    }

    function newTask(title, date, description, isImp, isComp) {
        setTasks(prevState => [...prevState, {
            id: nanoid(),
            title: title,
            desc: description,
            date: date,
            isImportant: isImp,
            isCompleted: isComp
        }])
    }

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function handleChangeImp(id) {
        // tasks.map(value => setTasks(prevState => ))
        // setTasks(prevState => tasks.map(value => value.id === id ? [...prevState, {...prevState, isImportant: !prevState}] : [...prevState]))
        setTasks(prevState => prevState.map(value => {
            if(value.id === id) {
                return {
                    ...value, isImportant: !value.isImportant
                }
            } else {
                return value
            }
        }))
    }
    function handleChangeComp(id) {
        setTasks(prevState => prevState.map(value => {
            if(value.id === id) {
                return {
                    ...value, isCompleted: !value.isCompleted
                }
            } else {
                return value
            }
        }))
    }
    function handleEdit(id, title, description, date, imp, comp) {
        setOverlay(prevState => !prevState)
        setEdit(prevState => true)
        setContent({
            title: title,
            description: description,
            date: date,
            isImportant: imp,
            isCompleted: comp
        })
        setIdEdit(id)
    }

    function handleSaveEdit() {
        setTasks(prevState => prevState.map(value => {
            if(value.id === idEdit) {
                return {
                    ...value, title: content.title, desc: content.description, date: content.date, isImportant: content.isImportant, isCompleted: content.isCompleted
                }
            } else {
                return value
            }
        }))
        setOverlay(prevState => !prevState)
        setEdit(prevState => false)
        setContent(prevState => {
            return {
                title: "",
                date: "",
                description: "",
                isImportant: false,
                isCompleted: false
            }
        })
    }

    function handleChange(e) {
        const {name, value, checked, type} = e.target
        setContent(prevState => {
            return {
                ...prevState,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSave() {
        if (content.title.trim().length > 0 && content.date !== "") {
            newTask(content.title, content.date, content.description, content.isImportant, content.isCompleted)
            setContent(prevState => {
                return {
                    title: "",
                    date: "",
                    description: "",
                    isImportant: false,
                    isCompleted: false
                }
            })
            setOverlay(prevState => !prevState)
        } else {
            alert("Title and Date cannot be empty")
        }
    }

    function handleDelete(id) {
        setTasks(prevState => prevState.filter(value => value.id !== id))
    }

    return (
        <div className={`main-container${darkMode ? " mdark" : ""}`}>
            {/*LEFT COMPONENT----------------------------------------------------------------------------------------*/}

            <div className="left-container">
                <div className="header">
                    <h1>TO-DO LIST</h1>
                    <button className="add-task-button"
                            onClick={handleOverlay}>Add new task
                    </button>
                </div>
            </div>

            {/*MIDDLE COMPONENT--------------------------------------------------------------------------------------*/}

            <div className="overlay" style={{display: `${overlay ? "block" : "none"}`}}>
                <div className={`add-interface${darkMode ? " adark" : ""}`}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h1>{edit ? "Edit Task" : "Add a Task"}</h1>
                        <button onClick={handleOverlay} className="close-button"><img src={close} alt=""
                                                                                      className="close-icon"/></button>
                    </div>
                    <div className="inputs">
                        <div>
                            <p>Title</p>
                            <input className={`input${darkMode ? " idark" : ""}`}
                                   type="text"
                                   placeholder="e.g, Study for test"
                                   name="title"
                                   value={content.title}
                                   onChange={handleChange}/>
                        </div>
                        <div>
                            <p>Date</p>
                            <input type="date"
                                   className={`input${darkMode ? " idark" : ""}`}
                                   name="date"
                                   value={content.date}
                                   onChange={handleChange}/>
                        </div>
                        <div>
                            <p>Description (optional)</p>
                            <textarea
                                className={`textarea${darkMode ? " tdark" : ""}`}
                                value={content.description}
                                rows="5"
                                cols="10"
                                onChange={handleChange}
                                name="description"
                                placeholder="Type to add a Description...">
                            </textarea>
                        </div>
                        <div className="checkboxes">
                            <label className="labels">
                                <input type="checkbox"
                                       className="checkbox-round"
                                       onChange={handleChange}
                                       name="isImportant"
                                       checked={content.isImportant}/>
                                <p>Mark as important</p>
                            </label>
                            <label className="labels">
                                <input type="checkbox"
                                       className="checkbox-round"
                                       onChange={handleChange}
                                       name="isCompleted"
                                       checked={content.isCompleted}/>
                                <p>Mark as completed</p>
                            </label>
                        </div>
                    </div>
                    <button className="add-task-button"
                            onClick={edit ? handleSaveEdit : handleSave}>{edit ? "Save Task" : "Add Task"}
                    </button>
                </div>
            </div>

            <div className={`middle-container${darkMode ? " midark" : ""}`}>
                <div>
                    <div className="middle-header">
                        <input type="text"
                               placeholder="Search task"
                               className={`search-input${darkMode ? " idark" : ""}`}
                               onChange={handleSearch}/>
                        <h1>{date.toDateString()}</h1>
                        <div style={{display: "flex", gap: 20}}>
                            <img alt=""
                                 src={bell}
                                 className="bell-icon"/>
                            <button className="add-task-button-middle"
                                    onClick={handleOverlay}>Add new task
                            </button>
                        </div>
                    </div>
                    <h1 style={{marginTop: 15}}>All Tasks ({`${tasks.length} Tasks`})</h1>
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: 35}}>
                        <div style={{display: "flex", gap: 10}}>
                            <img alt="" src={view === "List" ? listSelected : list} className="menu-icon" onClick={() => setView("List")}/>
                            <img alt="" src={view === "Card" ? cardSelected : Card} className="menu-icon" onClick={() => setView("Card")}/>
                        </div>
                        <p>Sort By</p>
                    </div>
                </div>

                <div className={`tasks-section${view === "List" ? "-list" : ""}`}>
                    <TaskList tasks={tasks.filter(value => value.title.toLowerCase().includes(search))}
                              dm={darkMode}
                              changeImp={handleChangeImp}
                              changeComp={handleChangeComp}
                              edit={handleEdit}
                              delete={handleDelete}/>
                    <div className={`empty${darkMode ? " edark" : ""}`}>Add new task</div>
                </div>

            </div>

            {/*RIGHT COMPONENT---------------------------------------------------------------------------------------*/}

            <div className="right-container">
                <div>
                    <div className="user">
                        <h5>Hi, User!</h5>
                        <img src={dp} alt="" className="dp"/>
                    </div>
                    <div className="darkmode">
                        <h5>Darkmode</h5>
                        <button onClick={handleDarkMode} className="darkmode-button"></button>
                    </div>
                </div>
                <div className="delete-all">
                    <buton onClick={() => setTasks([])}>Delete all data</buton>
                </div>
            </div>
        </div>
    )
}
