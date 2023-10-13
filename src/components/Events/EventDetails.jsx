import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryclient } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import Header from '../Header.jsx';
import Modal from '../UI/Modal.jsx';
import { useState } from 'react';



export default function EventDetails() {
const [isDeleting , setIsDeleting] = useState()

const {id} = useParams()
const navigate = useNavigate();
const {data,isFetching , isError,error} = useQuery({
  queryKey:['event' ,{id:id}],
  queryFn:({signal})=>fetchEvent({signal,id})
})

const {
  mutate,
  isError:isErrorDeletting,
  error:deleteError,
  isLoading:isLoadingDeletion
} = useMutation({
  mutationFn:deleteEvent,
  onSuccess:() =>{
      // khi submỉt thành công :
      // + đánh dấu là dữ liệu lưu trong cache đã cũ
      queryclient.invalidateQueries(
        {
          queryKey:['events'],/* exact : true sẽ chỉ định chính xác nó , 
                                        kh tính thành phần phụ sau nó */
          // mình đặt refetchType ở đây là mình sẽ yêu cầu react-query kh tái truy vấn key này
          // bởi vì dữ liệu đã bị xóa thì tái truy vấn thì sẽ tìm không thấy và bị báo lỗi
          refetchType:"none"
      });
      // điều hướng qua page khác
      navigate('/events')
    }
})

  function handleStartDelete(){
    setIsDeleting(true)
  }

  function handleStopDelete(){
    setIsDeleting(false)
  }

  function handleDelete() {
    mutate({id:id})
  }

let content;

if(isFetching){
    content = <LoadingIndicator/>
}
if(isError){
  content = 
    <ErrorBlock title={"An error occurred"} 
    message={error.info?.message || "Failed to fetch event data , please try again later" }
    />
}

if(data){
    content= (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.location}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
</>
)}


  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this event? This action cannot be undone.</p>
        <div className="form-actions">
          {isLoadingDeletion && <p>Deleting , please wait...</p>}
          {!isLoadingDeletion && (
          <>
            <button onClick={handleStopDelete} className='button-text' >Cancel</button>
            <button onClick={handleDelete} className='button' >Delete</button>
          </>
          )}
        </div>
        {isErrorDeletting && 
        <ErrorBlock 
          title={"Failed to delete event"} 
          message={deleteError.info?.message || 'Failed to delete event , please try again later.'}
        />
        }
      </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
