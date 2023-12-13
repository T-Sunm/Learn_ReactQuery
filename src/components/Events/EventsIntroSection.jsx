import { Link } from 'react-router-dom';

import meetupImg from '../../assets/meetup.jpg';
import { useSelector } from 'react-redux';

export default function EventsIntroSection() {
  const authenticated = useSelector((state) => state.auth.authenticated)

  return (
    <section
      className="content-section"
      id="overview-section"
      style={{ backgroundImage: `url(${meetupImg})` }}
    >
      <h2>
        Connect with amazing people <br />
        or <strong>find a new passion</strong>
      </h2>
      <p>Anyone can organize and join events on React Event!</p>
      {authenticated && (<p>
        <Link to="/events/new" className="button" >
          Create your first event
        </Link>
      </p>)}
    </section>
  );
}
