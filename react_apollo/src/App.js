import { useEffect, useState } from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import TodoListData from './state'
import TodoList from './scroll/TodoList';

const AppQuery = gql`
query AppQuery {
  getPost{
    id,
    feed
  }
}
`;

const AppMutationQuery = gql`
mutation AppMutationQuery($feed: String!) {
  createPost(input:{
    feed : $feed
  }){
    feed,
    id
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(AppQuery);
  const [txt,setTxt] = useState("")
  const [addTodo] = useMutation(AppMutationQuery);
  const [load,setLoad] = useState(true)
  const [doList,setDoList] = useState([])

  useEffect(()=>{
 if(!loading){
  setDoList(data.getPost)
  setLoad(false)
 }
   
  },[loading])

  const Submit=async()=>{
    addTodo({variables: {feed: txt }}).then(data=>{
      console.log(data.data.createPost[0])
    
      setDoList(doList=>[data.data.createPost[0],...doList])
    })
    setTxt("")
  }

  return (
    <div >
     <div style={{
       marginLeft:window.innerWidth*0.2
     }}>
      <h1 >Add List .... </h1>
     <div style={{
       display:'flex',
       flexDirection:'column'
     }}>
     <input
        onChange={(e)=>setTxt(e.target.value)}
        value={txt}
        placeholder="Enter task .."
        style={{
         height:window.innerHeight*0.05,
          width:window.innerWidth*0.70,
          borderLeft:'hidden',
          borderRight:'hidden',
          borderTop:'hidden',
          outline:'none'
        }}/>
      
     <button 
     onClick={()=>{
       if(txt!==""){
         Submit()
       }
     }}
     style={{
       backgroundColor:'white',
       marginTop:"2%",
       width:100,
       height:30,
       borderWidth:0.1,
       cursor:'pointer'
     }}>
          <span style={{fontWeight:'bold',color:'black'}}>ADD</span>
        </button>
     </div>
    {load?(
      <p>Loading..</p>
    ):(
      <TodoList tasks={doList}/>
      // <p>Hello  world</p>
    )}
     </div>
    </div>
  );
}

export default App;
