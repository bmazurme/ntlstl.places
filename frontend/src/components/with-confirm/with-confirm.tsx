import React from 'react';

export default function WithConfirm({
  card, title, buttonText, onSubmit, isLoading,
} : {
  card: Card;
  title: string;
  buttonText: string;
  isLoading: boolean;
  onSubmit: (c: Card) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <form
      className="form"
      name="confirm-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <h2 className="title">{title}</h2>
      <button aria-label="Delete" className="submit" type="submit">
        {isLoading ? 'Deleting...' : buttonText}
      </button>
    </form>
  );
}
