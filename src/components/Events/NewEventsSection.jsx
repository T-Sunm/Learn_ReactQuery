import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../../utils/http.js';

export default function NewEventsSection() {
    const {data, isPending , isError , error, refetch} = useQuery({
      queryKey:['events'],
      queryFn:fetchEvents,
      staleTime:5000,
      // cacheTime: Kiểm soát thời gian mà một kết quả truy vấn còn tồn tại 
      //trong bộ nhớ cache sau khi nó trở nên không còn sử dụng.
      // cacheTime:5000
    })


  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred" message= {error.info?.message || "Failed to fetch events"} />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
