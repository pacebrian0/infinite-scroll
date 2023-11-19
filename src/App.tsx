import { useState, useEffect } from 'react'
import './App.css'
import TodoCard from './components/TodoCard'
import { Itodo } from './types/todo'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

function App() {
  const { ref, inView } = useInView();


  const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${pageParam}`)
    return await res.json();
  }
  const { data, status, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage
    }

  });
  const content = data?.pages.map((todos: Itodo[]) => todos.map((todo) => {
    // if(todos.length == index + 1) return (<TodoCard innerRef={ref} key={todo.id} todo={todo} />)
    return (<TodoCard key={todo.id} todo={todo}/>)
  }));

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])
  return (
    <>
      <div className='app'>
        {status === 'pending' ?
          (<p>Loading</p>) :
          status === 'error' ?
            `<p>Error: ${error.message}</p>` :
            content
      /* <div className='app'>
      {data?.pages[0].map((x:any) => <TodoCard  key={x.id} todo={x} />)}
      </div> */}
        {/* <button ref={ref} onClick={() => fetchNextPage()} disabled={isFetchingNextPage|| status === 'pending' || !hasNextPage}>{isFetchingNextPage?"Loading...":hasNextPage?"Load More":'End of Data'}</button> */}
        <div ref={ref}></div>
        {(isFetchingNextPage && hasNextPage && <h3>Loading...</h3>) || (!hasNextPage && <h3>End of Data</h3>) }
      </div>

    </>
  )
}

export default App
