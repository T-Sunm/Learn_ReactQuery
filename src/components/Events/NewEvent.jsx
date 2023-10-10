import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvents } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // 
  const {mutate,error,isLoading,isError} = useMutation({
    mutationFn:createNewEvents
  });

  function handleSubmit(formData) {
    mutate({event:formData})
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
      <ErrorBlock title={"Failed to create event" } 
      message={error.info?.message || 'Failed to create event. Please check your inputs and try again later.'}
      />}
    </Modal>
  );
}
