import React, { Component } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  handleNumberChange = (event) => {
    this.setState({
      ...this.state,
      number: event.target.value,
    });
  };

  handleAddContact = () => {
    const { addContact, contacts } = this.props;

    if (this.state.name.trim() === '' || this.state.number.trim() === '') {
      alert('Please enter both name and phone number.');
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(this.state.number, 'ZZ');
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Please enter a valid phone number. The expected format is +1234567890.');
      return;
    }

    if (contacts.some((contact) => contact.name.toLowerCase() === this.state.name.toLowerCase())) {
      alert('Contact with this name already exists. Please enter a different name.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    console.log('New contact to add:', newContact);

    addContact(newContact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div className={css.contactForm}>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я]+)*$"
          title="Please enter a valid name"
          required
          value={this.state.name}
          onChange={this.handleNameChange}
          placeholder="Enter name"
          className={css.input}
        />

        <input
          type="tel"
          name="number"
          title="Please enter a valid phone number. The expected format is +1234567890."
          required
          value={this.state.number}
          onChange={this.handleNumberChange}
          placeholder="Enter phone number"
          className={css.input}
        />

        <button className={css.button} onClick={this.handleAddContact}>
          Add Contact
        </button>
      </div>
    );
  }
}
