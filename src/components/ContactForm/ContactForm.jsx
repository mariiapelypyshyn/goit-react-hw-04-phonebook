import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Label, Button, Input } from './ContactForm.styled';

const ContactForm = ({onSubmit}) =>  {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Генерація унікальних ідентифікаторів для полів форми
 const nameInputId = nanoid();
 const numberInputId = nanoid();

   // Обробка відправки форми
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  // Обробка змін значень полів форми
 const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.target.value);
  };


    return (
      <Form onSubmit={handleSubmit}>
        <Label htmlFor={nameInputId}>
          <p>Name</p>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            pattern="^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>

        <Label htmlFor={numberInputId}>
         <p>Number</p>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChangeNumber}
            pattern="\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>

        <Button type="submit">Add contact </Button>
      </Form>
    );
  
}

export default ContactForm;