import { nanoid } from 'nanoid';
import { Component } from 'react';
import { PropTypes } from 'prop-types';

export class Filter extends Component {
  filterInputId = nanoid();

  handleFilterChange = e => {
    this.props.onFilterChange(e.target.value);
  };

  render() {
    const { filterValue } = this.props;
    return (
      <div>
        <label htmlFor={this.filterInputId}>Find contacts by name</label>
        <input
          type="text"
          id={this.filterInputId}
          value={filterValue}
          onChange={this.handleFilterChange}
          name="filter"
        />
      </div>
    );
  }
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
