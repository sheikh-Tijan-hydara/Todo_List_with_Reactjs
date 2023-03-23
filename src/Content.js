

import ItemList from './ItemList';

const Content = ({items, handleChecked, handleDelete}) => {
          
    return (
      <>

        {items.length ? (
              <ItemList       
                items={items}
                handleChecked={handleChecked}
                handleDelete={handleDelete}
              />
        ) : (
          // if the items is empty then we show this paragraph
            <p style={{marginTop: '2rem'}}>Your List is empty</p>  
        )}
      </>
    )
}

export default Content