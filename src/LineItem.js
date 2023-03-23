import {FaTrashAlt} from 'react-icons/fa';

const LineItem = ({item, handleChecked, handleDelete}) => {
  return (
    // create an li and give it a className and set the key to the id
    <li className="item">
        <input 
            // set the type of the input to checkbox
            type="checkbox"
            onChange={()=> handleChecked(item.id)}
            // set checked to the checked value of the item which is true/false
            checked={item.checked} 
        /> 
        <label
        // if the item is checked draw a line through it
            style={(item.checked) ? {textDecoration: 'line-through'} : null}
            // onDouble click call the handleChecked function
            onDoubleClick={()=> handleChecked(item.id)}
        >{item.item}</label>
        <FaTrashAlt 
                // onclick call the handleDelete function
                onClick={()=> handleDelete(item.id)}
                role="button" 
                tabIndex="0"
                aria-label={`Delete ${item.item}`}
        />
    </li>
  )
}

export default LineItem