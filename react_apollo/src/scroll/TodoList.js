import React, { useState, useEffect } from "react";
import TodoListScroller from "./TodolistScroller";




const TodoList = (props) => {
  
  const [items, setItems] = useState(() => Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
        
     if(items.length+20<props.tasks.length){
        const nextItems = items.concat(Array.from({ length: 20 }));
        setItems(nextItems);
     }else{
         var count = props.tasks.length-items.length
         
         const nextItems = items.concat(Array.from({ length: count }));
         setItems(nextItems);
     }
    }, 500);
  };

  useEffect(() => {
 

    if (items.length >= props.tasks.length) {
      setHasMore(false);
    }
  }, [items.length]);

  const rowRenderer = ({ index, key, style }) => (

          <li style={{
            fontSize:21,
            paddingTop:'10px',
            paddingBottom:'10px'
          }}>
            {props.tasks[index].feed}
          </li>
       
  );

  return (
    <div style={{marginTop:"20px"}}>
      <TodoListScroller
        dataLength={items.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            loading...
          </div>
        }
        height={400}
        elementHeight={17} // 새로 추가
        rowRenderer={rowRenderer}
        children={items}
        
      />
    </div>
  );
};

export default TodoList;
