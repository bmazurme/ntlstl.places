import React from 'react';
import { Link } from 'react-router-dom';

export default function Tag({ tag }: { tag: Tag }) {
  return (
    <li>
      <Link to={`${tag.name}`}>
        {tag.name}
      </Link>
    </li>
  );
}
