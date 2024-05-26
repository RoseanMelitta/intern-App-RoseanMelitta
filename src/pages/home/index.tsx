/* eslint-disable react/jsx-handler-names */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import { useState } from 'react';

type Card = {
  descr: string;
  id: number;
  title: string;

};

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [titleUpdate, setTitleUpdate] = useState('');
  const [descrUpdate, setDescrUpdate] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      title,
      descr,
    };
    setCards([...cards, newCard]);
    setTitle('');
    setDescr('');
  };

  const updateCard = (id: number) => {
    if (editingId !== null) {
      const updatedCards = cards.map((card) =>
        card.id === editingId 
          ? {
             ...card, 
            title: titleUpdate !== '' ? titleUpdate : card.title,
            descr: descrUpdate !== '' ? descrUpdate : card.descr,
          } : card
      );
    
      setCards(updatedCards);
      setTitleUpdate(titleUpdate);
      setDescrUpdate(descrUpdate);
      setEditingId(null); 
    }
  };

  const deleteCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        width: '100%',
      }}
    >
      <h1>Welcome!</h1>
      <h3>Would you like to add some cards?</h3>
      <div className="add-card-container">
        
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Description"
          value={descr}
          onChange={(event) => setDescr(event.target.value)}
        />
        <button onClick={addCard}>Add Card</button>
      </div>
      <ul className='cards'>
        {cards.map((card) => (
          <li key={card.id} className='cards-individual'>
            <h2>
              <input
                placeholder={card.title}
                type="text"
                value={editingId === card.id ? titleUpdate : card.title}
                onChange={(event) => setTitleUpdate(event.target.value)}
              />
            </h2>
            <textarea
              placeholder={card.descr}
              value={editingId === card.id ? descrUpdate : card.descr}
              onChange={(event) => setDescrUpdate(event.target.value)}
            />
            <div className="button-group">
              <button onClick={() => setEditingId(card.id)}>Edit card</button>
              <button onClick={() => deleteCard(card.id)}>Delete card</button>
              {editingId === card.id && <button onClick={() => updateCard(card.id)}>Save</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
