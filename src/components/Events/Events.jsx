import { Link, Outlet } from 'react-router-dom';

import Header from '../Header.jsx';
import EventsIntroSection from './EventsIntroSection.jsx';
import FindEventSection from './FindEventSection.jsx';
import NewEventsSection from './NewEventsSection.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalFalse, setToggleModal, setUserInfo } from '../../store/slice/AuthSlice.js';

export default function Events() {

  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.auth.authenticated)
  const handleLogout = () => {
    localStorage.clear()
    dispatch(setAuthModalFalse())
    dispatch(setUserInfo(null))
  }
  return (
    <>
      <Outlet />
      <Header>

        {authenticated ? (
          <>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
            <Link to="/events/new" className="button">
              New Event
            </Link>
          </>
        ) : (
          <button className="button" onClick={() => dispatch(setToggleModal(true))}>
            Login
          </button>
        )}
      </Header>
      <main>
        <EventsIntroSection />
        <NewEventsSection />
        <FindEventSection />
      </main>
    </>
  );
}
