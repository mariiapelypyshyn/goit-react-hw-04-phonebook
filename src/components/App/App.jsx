import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {

  const [contacts, setContacts] = useState(() => {
    const getContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(getContacts) ?? [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },];

    return parsedContacts;
  }, []);

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);
 
  const [filter, setFilter] = useState('');

  // Додавання нового контакту в список контактів
  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts([{ id: nanoid(), ...contact }, ...contacts])
  };

  // Зміна значення фільтру
  const changeFilter = event => {
    setFilter(event.target.value);
  };

  // Отримання відфільтрованих контактів
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Видалення контакту зі списку
  const removeContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId))
     
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        // Фільтр для відображення контактів
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        // Список контактів
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
}

export default App;