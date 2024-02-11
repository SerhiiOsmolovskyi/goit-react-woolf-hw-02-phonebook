import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '+14591256121' },
      { id: 'id-2', name: 'Hermione Kline', number: '+38443891226' },
      { id: 'id-3', name: 'Eden Clements', number: '+16451787918' },
      { id: 'id-4', name: 'Annie Copeland', number: '+12279112645' },
    ],
    filter: '',
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  checkContactExist = (name) => {
    const { contacts } = this.state;
    return contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  };

  addContact = (newContact) => {
    const { name } = newContact;

    if (name.trim() === '') {
      alert('Please enter a name.');
      return;
    }

    if (this.checkContactExist(name)) {
      alert('Contact with this name already exists. Please enter a different name.');
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.appContainer}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}
