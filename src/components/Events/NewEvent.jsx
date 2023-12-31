import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvents, queryclient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useSelector } from 'react-redux';

export default function NewEvent() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo)
  console.log(userInfo)
  // 
  const { mutate, error, isLoading, isError } = useMutation({
    mutationFn: createNewEvents,
    onSuccess: () => {
      // khi submỉt thành công :
      // + đánh dấu là dữ liệu lưu trong cache đã cũ
      queryclient.invalidateQueries({
        queryKey: ['events'],/* exact : true sẽ chỉ định chính xác nó , 
                                                                    kh tính thành phần phụ sau nó */
      });
      // điều hướng qua page khác
      navigate('/events')
    }
  });

  function handleSubmit(formData) {
    mutate({ event: formData, idUser: userInfo.id })
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isLoading && 'Submitting'}
        {!isLoading && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}

      </EventForm>
      {isError &&
        <ErrorBlock title={"Failed to create event"}
          message={error.info?.message || 'Failed to create event. Please check your inputs and try again later.'}
        />}
    </Modal>
  );
}
