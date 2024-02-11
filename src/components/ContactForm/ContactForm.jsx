import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export const ContactForm = ({ addContact, contacts }) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleNameChange = (event) => {
    setState({
      ...state,
      name: event.target.value,
    });
  };

  const handleNumberChange = (event) => {
    setState({
      ...state,
      number: event.target.value,
    });
  };

  const handleAddContact = () => {
    if (state.name.trim() === '' || state.number.trim() === '') {
      alert('Please enter both name and phone number.');
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(state.number, 'ZZ');
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Please enter a valid phone number. The expected format is +1234567890.');
      return;
    }

    if (contacts.some((contact) => contact.name.toLowerCase() === state.name.toLowerCase())) {
      alert('Contact with this name already exists. Please enter a different name.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: state.name,
      number: state.number,
    };

    console.log('New contact to add:', newContact);

    addContact(newContact);

    setState({
      name: '',
      number: '',
    });
  };

  return (
        <div className={css.contactForm}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я]+)*$"
        title="Please enter a valid name"
        required
        value={state.name}
        onChange={handleNameChange}
        placeholder="Enter name"
        className={css.input}
      />

      <input
        type="tel"
        name="number"
        title="Please enter a valid phone number. The expected format is +1234567890."
        required
        value={state.number}
        onChange={handleNumberChange}
        placeholder="Enter phone number"
        className={css.input}
      />

      <button className={css.button} onClick={handleAddContact}>
        Add Contact
      </button>
    </div>
  );
};