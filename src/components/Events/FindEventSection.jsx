import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../utils/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  // phải xài biến useState để nó tái render 
  // và cập nhật lại biến trong queryKey

  // ban đầu phải set State undifined để khi search xong và xóa hết đi state sẽ thành "" 
  // và phần search sẽ search all dữ liệu giúp mình
  const [searchTerm , setSearchTerm] = useState()

  const {data , isFetching , isError, error} =  useQuery({
    queryKey:['events' , {searchTerm: searchTerm}],

  //Khi bạn truyền tham số vào queryFn, React Query tự động cung cấp một đối tượng có chứa tất cả các phần tử từ queryKey. 
  //Điều này có nghĩa là, nếu queryKey của bạn là ['events', { searchTerm: 'myTerm' }], 
  //thì đối số mà queryFn nhận sẽ là { queryKey: ['events', { searchTerm: 'myTerm' }] }.
  // và có thêm vài thuộc tính bổ sung như signal...
  // nên phải xài {searchTerm} thay vì searchTerm
    // signal được sử dụng để hủy bỏ yêu cầu fetch.
    queryFn:({signal,queryKey}) => fetchEvents({signal,...queryKey[1]}),
    enabled:searchTerm !== undefined
  })

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value)
  }

  let content = <p>Please enter a search term and to find events.</p>

  if(isFetching){
    content = <LoadingIndicator/>
  }
  if(isError){
    content = 
    <ErrorBlock title={"An error occurred"} 
    message={error.info?.message || "Failed to fetch events" }
    />
  }

  if(data){
    content=<ul className='events-list'>
      {data.map(event => (
        <li key={event.id}>
          <EventItem event={event}/>
        </li>
      ))}
    </ul>
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
