// import ThemeToggle from './ThemeToggle';

const Header = ({
  hostName,
  hostUrl,
}: {
  hostName: string;
  hostUrl: string;
}) => (
  <header className="flex items-center justify-between max-w-screen-xl p-4">
    <a
      href={hostUrl}
      target="_blank"
      rel="noreferrer"
      className="text-2xl font-bold uppercase"
    >
      {hostName}
    </a>
    {/* <ThemeToggle /> */}
  </header>
);

export default Header;
