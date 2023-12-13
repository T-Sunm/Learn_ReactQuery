import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent, { action as editEventAction, loader as editEventLoader } from './components/Events/EditEvent.jsx';
import { queryclient } from './utils/http.js';
import ModalLogin from './components/Modal/ModalLogin.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/events" />,
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />,
      },
    ],
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction
      },
    ],
  },
]);


function App() {
  return <QueryClientProvider client={queryclient} >
    <RouterProvider router={router} />
    <ModalLogin />
  </QueryClientProvider>;
}

export default App;
