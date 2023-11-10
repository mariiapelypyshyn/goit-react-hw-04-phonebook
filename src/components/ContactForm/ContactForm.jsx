import React from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './ContactForm.styled';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  // Генерація унікальних ідентифікаторів для полів форми
  nameInputId = nanoid();
  numberInputId = nanoid();

  // Обробка відправки форми
  handleSubmit = event => {
    event.preventDefault();

    // Виклик функції onSubmit із батьківського компонента з передачею об'єкта контакта
    this.props.onSubmit({ name: this.state.name, number: this.state.number });

    // Скидування стану форми
    this.reset();
  };

  // Обробка змін значень полів форми
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Скидування стану форми
  reset = () => {
    this.setState({ number: '', name: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor={this.nameInputId}>
          <p>Name</p>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label htmlFor={this.numberInputId}>
         <p>Number</p>
          <Input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact </Button>
      </Form>
    );
  }
}

export default ContactForm;