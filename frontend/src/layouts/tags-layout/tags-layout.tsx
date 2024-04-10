import React from 'react';
import { Link } from 'react-router-dom';

import Board from '../../components/board';
import Preloader from '../../components/preloader';

import { useGetTagsQuery } from '../../store';

function Tag({ tag }: { tag: Tag }) {
  return (<li><Link to={`${tag.name}`}>{tag.name}</Link></li>);
}

function Tags({ tags }: { tags: Tag[] | undefined }) {
  return (
    <ul>
      {tags?.map((tag) => <Tag key={tag.id} tag={tag} />)}
    </ul>
  );
}

export default function TagsLayout() {
  const { data: tags, isLoading } = useGetTagsQuery();

  return (
    <Board
      children={isLoading ? <Preloader /> : <Tags tags={tags} />}
      title="Tags"
    />
  );
}
