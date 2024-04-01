import React from 'react';

import Board from '../../components/board';

export default function TagsLayout() {
  return (
    <Board
      children={(
        <ul>
          <li>tag</li>
        </ul>
      )}
      title="Tags"
    />
  );
}
