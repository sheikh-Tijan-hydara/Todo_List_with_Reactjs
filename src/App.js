import {useState, useEffect} from 'react';
import './index.css';
import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';


function App() {
  const API_URL = ' http://localhost:3500/items';

  
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);


 useEffect(() => {
      // fetch the items asynchronously using the rest API 
    const fetchItems = async ()=> {
      try{//set the response to the data fetched from the API_URL
        const response  = await fetch(API_URL);
        // if the response is not ok throw an error 
        if(!response.ok) throw Error('Did not receive expected data');
        // set the listItems to the json format of the response
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      }catch(err){
        setFetchError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())(); 
    }, 2000)

    
 }, []);




// addItem function adds an item to the list of items
 const addItem = async (item) => {
  // it sets the id of the new item to the id of the last item in the list plus 1
  const id =items.length ? items[items.length -1].id +1 :1;
  // the myNewItem object contains the id, checked state and item name
  const myNewItem = {id, checked: false, item};
  // a copy of the items array with myNewItem added
  const listItems = [...items, myNewItem];
  setItems(listItems);


  // posting to the API_URL
  const postOptions = {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(myNewItem)
  }
  const result = await apiRequest(API_URL, postOptions);
  if(result) setFetchError(result);
 }

  const handleChecked = async (id)=>{
      // listItems is created and set to the map of checked items
          const listItems = items.map((item) => item.id === id? {...item, checked: !item.checked} : item);
          setItems(listItems);

          // updating a part in the API_URL
        const myItem = listItems.filter((item) => item.id === id);
        const updateOptions = {
          method: 'PATCH',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({checked: myItem[0].checked})
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, updateOptions);
        if(result) setFetchError(result);
        
    }

    // this function takes an id argument 
    const handleDelete = async (id) => {
      // listItems is created and set to the filter of all the items that are not clicked 
      const listItems = items.filter((item) => item.id !== id);

      // pass the listItems to the setAndSaveItems function
      setItems(listItems);

      // deleting an item in the API_URL
       const deleteOptions = { method: 'DELETE'};
       const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if(result) setFetchError(result);
  }

  const handleSubmit = (e)=>{
      e.preventDefault();
      if(!newItem) return;
      addItem(newItem);
      setNewItem('');
  }

  return (
    <div className="App">
      <Header  title="To Do List "/>
     
      <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
      />
       <SearchItem
        search={search}
        setSearch={setSearch}
      />

      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
            // props
            items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
            />
        }    
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
 