import { Link } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string;
}
export function Navbar({ links }: { links: NavLink[] }) {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
