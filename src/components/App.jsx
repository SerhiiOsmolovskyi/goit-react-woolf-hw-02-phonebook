import React, { useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const [state, setState] = useState({
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+14591256121' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38443891226' },
      { id: 'id-3', name: 'Eden Clements', number: '+16451787918' },
      { id: 'id-4', name: 'Annie Copeland', number: '+12279112645' },
    ],
    filter: '',
  });

  const handleFilterChange = (event) => {
    setState({
      ...state,
      filter: event.target.value,
    });
  };

  const addContact = (newContact) => {
    setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  const deleteContact = (id) => {
    setState((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  const filteredContacts = state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(state.filter.toLowerCase())
  );

  return (
    <div className={css.appContainer}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={state.contacts} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={state.filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};