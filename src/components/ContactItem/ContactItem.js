import { Component } from 'react';
import styles from './ContactItem.module.css';
import { PropTypes } from 'prop-types';

export class ContactItem extends Component {
  handleDeleteContact = e => {
    this.props.onDeleteContact(e.target.value);
  };
  render() {
    const { contact } = this.props;
    return (
      <li className={styles['contact-item']}>
        <span className={styles['contact-name']}>{contact.name}</span>:{' '}
        {contact.number}
        <button
          onClick={this.handleDeleteContact}
          value={contact.id}
          className={styles.btn}
        >
          Delete
        </button>
      </li>
    );
  }
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
