import React , {useEffect, useState} from 'react'
import Notask1 from "./Notask1.webp"
import Dustbin from "./Dustbin.png"
import done from "./done.png"
import edit from "./edit.png"

function NewTodo() {
    const [input, setInput]= useState("")
    const [tasks, setTask]= useState(()=>{
        const localValue= localStorage.getItem("ITEMS")
        if(localValue===null){
            return []
        }
        else{
            return JSON.parse(localValue)
        }
    })
    useEffect(()=>{
        localStorage.setItem("ITEMS", JSON.stringify(tasks))
    }, [tasks])
    const Addtask=(e)=>{
        e.preventDefault()
        if(input==""){
            alert("Empty !")
        }
        else{
            setTask((currentTask)=>{ 
                return([...currentTask, {value: input, id: crypto.randomUUID(), edit: false, completed:"", editName: "edit"}])
            })
            console.log(tasks)
            setInput("")
        }
    }
    const DeleteTask=(id)=>{
        // console.log(id)
        setTask((currentTask)=>{
            return currentTask.filter(task =>{ 
                return task.id!=id})
        })
        
    }
    const ToggleEdit=(id)=>{
        setTask((currentTask)=>{
            return( currentTask.map(task=>{
                if(task.id==id){
                return{...task, edit:!task.edit}
                }
                else{
                    return task
                }
               
            }))
        })

    }
    const HandleChange=(id, edit, e)=>{
        if(edit){
            setTask((currentTask)=>{
                return currentTask.map(task=>{
                    if(task.id==id){
                        return{ ...task, value: e}
                    }
                    else{
                        return task 
                    }
                })
            })
        }

        return
    }
    const HandleDone=(id)=>{
        setTask(currentTask=>{
            return currentTask.map(task=>{
                if(task.id==id){
                    return{...task, completed:"Completed"}
                }
                return task
            })
        })
    }
  return (
    <div className='Todo'>
        <h1>My Todo's</h1>
        <form action="">
        <input className='input' type="text" placeholder="What's your plan" value={input} onChange={(e)=> setInput(e.target.value)} />
        <button onClick={(e)=> Addtask(e)} type="submit">Add</button>
        </form>
        
        {(tasks.length===0) && <img src={Notask1} alt="error" />}
        {console.log(tasks)}
        <ul>
           
            {tasks.map((task)=>{
                return( 
                   <li key={task.id}>
                     <input className={task.completed} id="work" type='text' value={task.value} onChange={(e)=>HandleChange(task.id, task.edit, e.target.value)}/>
                     <img className="Done" onClick={()=>HandleDone(task.id)} src={done} alt="Done" />
                     <img className="Edit" onClick={()=>ToggleEdit(task.id)} src={edit} alt="Edit" />
                     <img className="Delete"onClick={()=>DeleteTask(task.id)} src={Dustbin} alt="Delete" />
                   </li>
                )
            })}
        </ul>

    </div>
  )
}

export default NewTodo