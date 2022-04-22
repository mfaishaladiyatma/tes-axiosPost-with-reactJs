import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [dataId, setDataId] = useState([])
  const [cobaGet, setCobaGet] = useState([])
  const [cobaPost, setCobaPost] = useState("")
  const [post, setPost] = useState([])

  const handleID = (data) => {
    setId(data.target.value)
  }
  const handleTitle = (data) => {
    setTitle(data.target.value)
  }
  const handleBody = (data) => {
    setBody(data.target.value)
  }
  // const getId = (data) => {
  //   data.preventDefault()
  //   setDataId([...dataId, id])
  //   setId("")
  //   console.log(dataId)
  //   // console.log(dataId)
  // }
  // const getPost = () => {
  //   setPost([...post, cobaPost])
  // }

  // console.log(cobaPost)

  const url = 'https://jsonplaceholder.typicode.com/posts'

  const createPosts = (e) => {
    e.preventDefault()
    // getPost()
    setId("")
    setTitle("")
    setBody("")
    axios.post(url, {
      userId: id,
      title,
      body
    },
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then((response) => {
        console.log(response.data);
        setPost([...post, response.data]);
        setCobaPost(response.data);
        // console.log(post)
        // console.log("post>>", post.length)
        // console.log("cobaPost>>", cobaPost)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setCobaGet(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])



  return (
    <>
      <div className="App">
        <form id='form-test'>
          <label htmlFor="inputId">User ID</label>
          <input id='inputId' type="text" value={id} onChange={handleID} />
          <label htmlFor="inputName">Title</label>
          <input id='inputName' type="text" value={title} onChange={handleTitle} />
          <label htmlFor="inputBody">Body</label>
          <input id='inputBody' type="text" value={body} onChange={handleBody} />
          {/* <button onClick={getId} className='submit'>Submit</button> */}
          <button onClick={createPosts} className='createPost'>Create Post</button>
          {/* <h2>{id}</h2> */}
          {/* <ol>
            {dataId.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ol> */}
        </form>
      </div>
      {cobaPost ? <div className='hasilPost'>
        <h2>id: {cobaPost.id}</h2>
        <h2>user id: {cobaPost.userId}</h2>
        <h2>title: {cobaPost.title}</h2>
        <h2>body: {cobaPost.body}</h2>
      </div> : null}
      
      <ol>
        {post.map((data, index) => (
          <li key={index}>{data.title}</li>
        ))}
      </ol>
      {/* {cobaPost.map((postData) => (
      <h2>{postData.title}</h2>
    ))} */}

      {/* <h3>{cobaPost.title}</h3> */}

      {/* {!cobaPost ? <p>Tidak Ada data</p> : null} */}

      {/* <ol>
      {cobaGet.map((data) => (
        <li>{data.title}</li>
      ))}
    </ol> */}
    </>
  );
}

export default App;
