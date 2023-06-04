import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList/ContactList';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
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
        {contacts.length > 0 ? (
          <>
            <h2>Contacts:</h2>
            <Filter
              filterValue={filter}
              onFilterChange={this.handleFilterChange}
            />
            <ContactList
              contacts={contacts}
              filter={filter}
              onDeleteContact={this.handleDeleteContact}
            />
          </>
        ) : (
          <p>Your phonebook is empty.</p>
        )}
      </>
    );
  }

  componentDidMount() {
    try {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      });
    } catch (error) {
      console.log(`getting data from localstorage failed: ${error}`);
      Notiflix.Notify.failure(
        'Reading your contacts from memory failed.'
      );
    }
  }

  componentDidUpdate() {
    try {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } catch (error) {
      console.log(`updating localstorage failed: ${error}`);
      Notiflix.Notify.failure(
        'New contact was not added to memory.'
      );
    }
  }
}
