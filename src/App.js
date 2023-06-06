import { useEffect, useState } from 'react';
import Table from './components/Table';
import './App.css';
import { langContext } from './contexts/commonContext';
import { useLocation } from 'react-router-dom';
import BASE_URL_API from './axios';
import axios from 'axios';

const dataTodo = [
//   {
//     name: 'Todo 1',
//     des: 'This is to do 1',
//     status: true,
//     id: 0,
//   },
//   {
//     name: 'Todo 2',
//     des: 'This is to do 2',
//     status: true,
//     id: 1,
//   },
//   {
//     name: 'hú hú hí hí',
//     des: 'This is to do 3',
//     status: true,
//     id: 2,
//   },
]

function App() {
  // let [count, setCount] = useState(0);
  // const increase = () => {
  //   setCount(count + 1)
  // }
  const [initTodo, setInitTodo] = useState(dataTodo)
  const [nameTodo, setNameTodo] = useState('');
  const [desTodo, setDesTodo] = useState('');
  const [isSearch, setIsSearch] = useState('');
  const [isUpdate, setIsUpdate] = useState(false)
  const [searchArray, setSearchArray] = useState([]);
  const [crrTodoEdit, setCrrTodoEdit] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lang, setLang] = useState('EN');
  const {location} = useLocation()
  console.log(location)

  useEffect(()=>{
    const getData = async () => {
      const data = await axios.get(`${BASE_URL_API}/api/v1/dataTodo`
      // ,{
      //   id: 1,
      //   name: 'Todo 1',
      //   des: 'This is to do 1',
      //   status: false,
      // }
      )
      if(data.data){
        setInitTodo(data.data)

      } else {
        setInitTodo(data.data)
      }
      setIsLoading(false)
    }
    getData()
  },[])

  const handleSearchNameTodo = (nameTodo) => {
    const filterSearch = initTodo.filter(item => item.name.toLowerCase().includes(nameTodo.toLowerCase()));
    /*
    Nếu hàm filter phía bên trên trả ra kết quả
      + không tìm thấy -> mảng rỗng + isSearch -> false
      + không tìm thấy -> mảng rỗng + isSearch -> true 
      + nếu tìm thấy -> mảng != rỗng + isSearch -> true 
    */
    setIsSearch(nameTodo);
    setSearchArray(filterSearch);

  }
  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (!isUpdate) {
      const newTodo = {
        name: newTodo,
        des: desTodo,
        status: false,
        id: initTodo.length,
      }
      setInitTodo([...initTodo,newTodo])
      const created = axios.post(`${BASE_URL_API}/api/v1/dataTodo`,newTodo).then((rs)=>{
        if(rs){
          setInitTodo([...initTodo,newTodo])
        }
      })
    }
    else {
      console.log(crrTodoEdit)
      const idx = initTodo.findIndex((item) => item.id === crrTodoEdit.id)
      if (idx >= 0) {
        initTodo.splice(idx, 1, crrTodoEdit);
        axios.put(`${BASE_URL_API}/api/v1/dataTodo${initTodo[idx].id}`,crrTodoEdit).then((rs)=>{
          if(rs){
            setInitTodo([...initTodo])
          }
        })
        setIsUpdate(false);
      }
    }
  };

  const handleDropTodo = (id) => {
    axios.delete(`${BASE_URL_API}/api/v1/dataTodo/${id}`).then((rs)=>{
      if(rs){
          setInitTodo((prev)=>{
            return prev.filter(item => item.id !== id)
          })  
      }
    }) 
  }
  useEffect(()=>{
    if(isUpdate) {
      setNameTodo ('');
      setDesTodo ('');
    }
    else {
      setCrrTodoEdit ({});
    }
  },[isUpdate])
  // useEffect(()=>{
  //   const idTimeOut = setTimeout(()=>{
  //     setIsLoading(false);
  //   }, 2000)
  //   return () => {
  //     clearTimeout(idTimeOut)
  //   }
  // }, [])
  return (
    <langContext.Provider value={{
      lang: lang,
      setLang:()=>{
        if(lang === 'EN'){
          setLang('VI')
        }
        else{
          setLang('EN')
        }
      }
    }}>

    
    <div className="App light">
      <h1>To do application</h1>
      {/* {count} */}
      <div className="content-main">
        <div className="feat-top-form">
          <div className="search-input">
            <input type="text" name="search" placeholder="Type to search..." onChange={(e) => { handleSearchNameTodo(e.target.value) }} />
          </div>
          <form onSubmit={handleCreateTodo}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   increase();
          // }}
          >
            <input name="toDoTitle" placeholder="To do title"
              onChange={(e) => {
                if (!isUpdate) {
                  setNameTodo(e.target.value);
                } else {
                  setCrrTodoEdit({
                    ...crrTodoEdit, name: e.target.value
                  })
                }
              }}
              value={isUpdate && crrTodoEdit.name ? crrTodoEdit.name : nameTodo} />
            {nameTodo.length < 6 && nameTodo && <p style={{ color: 'red' }}>Name todo must be large 6 character!</p>}
            <input name="toDoDescription" className="midl-input" placeholder="Description"
              onChange={(e) => {
                if (!isUpdate) {
                  setDesTodo(e.target.value);
                } else {
                  setCrrTodoEdit({
                    ...crrTodoEdit, des: e.target.value
                  })
                }
              }}
              value={isUpdate && crrTodoEdit.des ? crrTodoEdit.des : desTodo} />
            {desTodo.length < 6 && desTodo && <p style={{ color: 'red' }}>Description todo must be large 6 character!</p>}
            {!isUpdate ? <button>Create Todo</button> : <button>Update Todo</button>}
          </form>
        </div>
        <div className="middle-feat">
          <button>Clear To do</button>
          <button>Mark as complete</button>
        </div>
        {isLoading ? <div>Loading...</div> :
          <Table data={isSearch ? searchArray : initTodo} 
            deleteTodo={handleDropTodo} 
            showAlert={(todoItem) => {
              setCrrTodoEdit(todoItem);
              setIsUpdate(true)}} >
          </Table>
        }
      </div>
    </div>
    </langContext.Provider>
  )
}

export default App;
