import { Component } from 'react';
import { ContactItem } from '../ContactItem/ContactItem';
import styles from './ContactList.module.css';
import { PropTypes } from 'prop-types';

export class ContactList extends Component {
  handleDeleteContact = id => {
    this.props.onDeleteContact(id);
  };

  render() {
    const { contacts, filter } = this.props;
    return (
      <ul className={styles['contacts-list']}>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(contact => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDeleteContact={this.handleDeleteContact}
            />
          ))}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
