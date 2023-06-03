import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleFilterChange = value => {
    this.setState({ filter: value });
  };

  handleSubmit = (newName, newNumber) => {
    const isContactExist = this.state.contacts
      .map(contact => contact.name)
      .includes(newName);
    !isContactExist
      ? this.setState(prevState => ({
          contacts: [
            ...prevState.contacts,
            { name: newName, number: newNumber, id: nanoid() },
          ],
        }))
      : window.alert(`${newName} is already in contacts.`);
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2>Contacts:</h2>
        <Filter filterValue={filter} onFilterChange={this.handleFilterChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={this.handleDeleteContact}
        />
      </>
    );
  }
}
