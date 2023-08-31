import React, { useEffect, useState, useRef } from 'react';
import { serverTimestamp, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import InputField from './Components/InputField';
import Box from './Components/Box';
import Items from './Components/Items';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    setTodos(data);
    setLoading(false); // Set loading to false when data is available
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data only on initial render

  // const removeToDO = async(id) => {
  //   try {
  //     await  deleteDoc(doc(db, "item", id));
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error adding item: ", error);
  //   }
  // }

  const removeToDO = async (id) => {
    try {
      // Get the document reference by specifying the collection name ("item") and the document ID (id)
      const todoRef = doc(db, "item", id);
      
      // Delete the document
      await deleteDoc(todoRef);
      
      // Fetch updated data
      fetchData();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

const updateHandler = async (id, newTodo) => {
  try {
    // Get the document reference by specifying the collection name ("item") and the document ID (id)
    const todoRef = doc(db, "item", id);

    // Update the document with the new data
    await updateDoc(todoRef, {
      todos: newTodo.trim(),
      timestamp: serverTimestamp(),
    });

    // Fetch updated data
    fetchData();
  } catch (error) {
    console.error("Error updating item: ", error);
  }
};

  

const addTodoHandler = async (newTodo) => {
  if (newTodo.trim() !== "") {
    if (!todos.some((todo) => todo.todos === newTodo.trim())) {
      try {
        await addDoc(collection(db, "item"), {
          todos: newTodo.trim(),
          timestamp: serverTimestamp(),
        });
        fetchData();
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    } else {
      console.error(`Item "${newTodo}" already exists.`);
    }
  } else {
    console.error("New item cannot be empty.");
  }
};


  // Conditional rendering based on loading state
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or animation
  }

  return (
    <div className="bg-black h-screen p-3">
      <div className="rounded mx-auto max-w-[750px] min-h-[550px] shadow-2xl bg-white">
        <InputField handler={addTodoHandler} />
        <Box data={todos} removeHandler={removeToDO} />
        <Items todos={todos} updateHandler={updateHandler} removeHandler={removeToDO} />

        {/* <Items updateHandler={updateHandler}/> */}
      </div>
    </div>
  );
}

export default App;


// import InputField from './Components/InputField';
// import Box from './Components/Box';
// import React, {useEffect,useState,useRef } from 'react';
// import { serverTimestamp, collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
// import {db} from './firebase';
// function App() { 

//   const [todos,setTodos] = useState([]);

//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "item"));
//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     setTodos(data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//     // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
//   // const [todos, setTodos] = useState(initialState);

//   // }, [todos]);
//   // useEffect(() => {
//   //   localStorage.setItem("todos", JSON.stringify(todos));

//     const removeToDO = (id) => {
//       // console.log(id);
//       const newTodos = todos.filter(
//         (d,index) => {
//           if(index !== id){
//             return true;
//           } else{
//             return false;
//           }
//         }
//       )
//      setTodos(newTodos);   //state update
//     }
//   //   const addTodoHandler = async (item) => {
//   //     // console.log(item);
//   //     if (!todos.some(todo => todo.item === item)) {        
//   //     setTodos(
//   //       [
//   //         ...todos,
//   //         {
//   //           item,
//   //           time: new Date().toTimeString()
//   //         }
//   //       ]
//   //     )
//   //   }
//   // }
//   const addTodoHandler = async (newTodo) => {
//     if (newTodo.trim() !== "") {
//       if (!todos.some(todo => todo.todos === newTodo.trim())) {
//         try {
//           await addDoc(collection(db, "item"), {
//             todos: newTodo.trim(),
//             timestamp: serverTimestamp(),
//             time: new Date().toLocaleTimeString()
//           });
//          fetchData();
//         } catch (error) {
//           console.error("Error adding item: ", error);
//         }
//       }
//     }
//   };

//     // const sortedTodos = [...todos].sort((a, b) => a.item.localCompare(b.item));
//     // const sortedTodos = [...todos].sort((a, b) => a.item.localeCompare(b.item));

//     // useEffect(() => {
//     //   if (JSON.stringify(sortedTodos) !== JSON.stringify(todos)) {
//     //     setTodos(sortedTodos);
//     //   }
//     // })
//     const sortedTodos = [...todos]
//     .filter(item => item && item.item) // Filter out items without 'item' property
//     .sort((a, b) => a.item.localeCompare(b.item));
  
//   useEffect(() => {
//     if (JSON.stringify(sortedTodos) !== JSON.stringify(todos)) {
//       setTodos(sortedTodos);
//     }
//   }, [sortedTodos]);
  
//    return (
  
//      <div className="bg-black h-screen p-3">
//     <div className="rounded mx-auto max-w-[750px] min-h-[550px] shadow-2xl bg-white">
//         <InputField handler={addTodoHandler}/>
//       <Box data={todos}  removeHandler={removeToDO}/>
//       </div>  
//     </div>
//   );
// }

// export default App;
