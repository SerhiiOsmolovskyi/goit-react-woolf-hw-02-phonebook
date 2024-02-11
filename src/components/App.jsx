import { Component } from 'react';
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
    this.setState({
      ...this.state,
      filter: event.target.value,
    });
  };

  addContact = (newContact) => {
    this.setState((prevState) => ({
      ...prevState,
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  filteredContacts = this.state.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
  );

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div className={css.appContainer}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} contacts={this.state.contacts} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}