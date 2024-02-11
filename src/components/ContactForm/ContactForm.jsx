import React, { Component } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddContact = () => {
    const { addContact } = this.props;
    const { name, number } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter both name and phone number.');
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(number, 'ZZ');
    if (!phoneNumber || !phoneNumber.isValid()) {
      alert('Please enter a valid phone number. The expected format is +1234567890.');
      return;
    }

    addContact({ id: nanoid(), name, number });
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
          onChange={this.handleChange}
          placeholder="Enter name"
          className={css.input}
        />

        <input
          type="tel"
          name="number"
          title="Please enter a valid phone number. The expected format is +1234567890."
          required
          value={this.state.number}
          onChange={this.handleChange}
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