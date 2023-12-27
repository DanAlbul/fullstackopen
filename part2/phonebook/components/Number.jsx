const Number = ({ person, onDelete }) => {
  return (
    <>
      <li>
        <div>
          <span>{person.name} : {person.number} </span>
          <button type='button' onClick={() => onDelete(person.id)}>delete</button>
        </div>
      </li>
    </>
  )
}

export default Number