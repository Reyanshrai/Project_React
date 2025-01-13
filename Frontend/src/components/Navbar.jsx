const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    navigate("/register")
  };

  return (
    <>
      <h1 className="text-2xl text-red-900 bg-yellow-200 text-center">I am Navbar</h1>
    </>
  )
}

export default Navbar;
