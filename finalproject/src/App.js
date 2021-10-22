//react
import { useState, useEffect } from 'react';

//components
import Category from './components/category';

//styles
import './test.css';

//import the API config file
import { API } from './api'


const App = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    let result = await fetch(`${API.base}/all`, { method: `GET` })
    let data = await result.json()
    setCategories(data)
  }

  // const activeHeroHandler = async (id) => {
  //   let result = await fetch(`${API.base}/reactivate/${id}`, { method: `PUT` })
  //   let data = await result.json()
  //   console.log(`active date => `, data)
  //   if (data !== undefined)
  //   loadCategories()
  // }

  // const deleteHeroHandler = async (id) => {
  //   let result = await fetch(`${API.base}/heros/delete/${id}`, { method: `DELETE` })
  //   let data = await result.json()
  //   console.log(`delete date => `, data)
  //   if (data !== undefined)
  //   loadCategories()
  // }

  return (
    <div className="App">
      {
        categories.map(category => <Category
          key={category.Serial_code}
          category={category}></Category>)
      }
    </div>
  );
}

export default App;
