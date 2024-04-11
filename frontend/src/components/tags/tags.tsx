import React from 'react';

import Tag from '../tag';

export default function Tags({ tags }: { tags: Tag[] | undefined }) {
  return (
    <ul>
      {tags?.map((tag) => <Tag key={tag.id} tag={tag} />)}
    </ul>
  );
}
