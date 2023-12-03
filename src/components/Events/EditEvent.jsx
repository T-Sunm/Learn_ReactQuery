import { Link, redirect, useNavigate, useParams, useSubmit } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryclient, updateEvent } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const submit = useSubmit()
  const { state } = useNavigate()
  const { id } = useParams()

  const { data, isError, error } = useQuery({
    queryKey: ['event', { id: id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10000
  })

  // const {mutate,
  // isError:isErrorEdit,
  // error:editError,
  // isLoading:isLoadingEdition} = 
  // useMutation({
  //   mutationFn:updateEvent,
  //   // sài onMutate thay vì onSucess để có thể chỉnh sửa cache tạm thời trong lúc đang mutation,
  //   // vd: để xem được dữ liệu cập nhật chưa thì mình reload lại mới xem được
  //   // để tối ưu hóa exp thì mình thay đổi bộ nhớ cache để hiển thị lên trc rồi invalidateQueries
  //   onMutate: async (data /* data này được truyền từ hàm mutate */ )=>{
  //     // sài setQueryData thay invalidateQueries vì :
  //     // setQueryData có thể ghi đè lên 1 bản ghi 
  //     // thay vì invalidateQueries để refetch lại thì nặng 
  //     const newEvent = data.event
  //     await queryclient.cancelQueries({queryKey:["event", {id:id}]})

  //     const previousEvent = queryclient.getQueryData(["event" , {id:id}])

  //     queryclient.setQueryData(["event" , {id:id}],newEvent)

  //     return {previousEvent}
  //   },

  //   onError:(error ,data, context) =>{
  //     // khi Lỗi thì nó lấy data chưa cập nhật lúc trước gán vô lại
  //     // vd: mình nhập "" thì nó sẽ lỗi , thay vì nhấn reLoad thì sài như này
  //     // nó sẽ tự động lấy lại dữ liệu cũ giúp mình
  //     queryclient.setQueryData(['event',{id:id}],context.previousEvent)
  //   },

  //   // khi mutation thành công hay kh thì hàm onSetteled cũng chạy
  //   onSettled:()=>{
  //     queryclient.invalidateQueries(['event',{id:id}])
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({id:id,event:formData})
    // navigate('../');

    //khi nhấn submit của form thì hàm sẽ tự động chạy hàm action
    // *chức năng mới của reacRouter* 
    submit(formData, { method: 'PUT' })

  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content =
      <>
        <ErrorBlock title={"Failed to load event"}
          message={error.info?.message || "Failed to fetch event data , please try again later"}
        />
        <div className='form-actions'>
          <Link to={"../"} className='button'>
            Okay
          </Link>
        </div>
      </>
  }

  if (data) {
    content = (
      <>
        <EventForm inputData={data} onSubmit={handleSubmit}>
          {state === 'submitting' ? <p>
            Sending data...
          </p>
            :
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          }
        </EventForm>
      </>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryclient.fetchQuery({
    queryKey: ['event', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })
}

export async function action({ request, params }) {
  const formData = await request.formData()
  // formData là một mảng chứa các cặp key-value, ví dụ:
  //[  ['name', 'John'],
  //['age', '30'],
  //['city', 'New York']//]
  // Sử dụng Object.fromEntries() sẽ biến đổi mảng này thành một đối tượng:
  // {
  //  name: 'John',
  //  age: '30',
  //  city: 'New York'
  //  }
  // tại khi submit form HTML thì nó lưu thành mảng cặp key-value
  // nên phải chuyển nó về object
  const updateEventData = Object.fromEntries(formData)
  await updateEvent({ id: params.id, event: updateEventData })
  await queryclient.invalidateQueries(['events'])
  return redirect('./')
}
