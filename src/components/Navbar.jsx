import siteLogo from '../assets/png/logo-no-background.png'

const Navbar = () => {
    return (
        <nav className="bg-white text-black h-28 p-4 font-font flex justify-between items-center">
            {/* Logo po lewej stronie */}
            <div className="flex items-center">
                <img src={siteLogo} alt="Logo" className="h-14 ml-12" />
            </div>
            {/* Zakładki po prawej stronie */}
            <div>
                {/* <span>Parking wathcer</span> */}
            </div>
            <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                <li class="mx-4 my-6 md:my-0">
                    <a href="/home" class="text-xl hover:text-cyan-500 duration-500">HOME</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="/about" class="text-xl hover:text-cyan-500 duration-500">ABOUT</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="/contact" class="text-xl hover:text-cyan-500 duration-500">CONTACT</a>
                </li>
                <button class="bg-cyan-400 text-white duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
                    <a href="/signin">Logowanie</a>
                </button>
                <button class="bg-cyan-400 text-white duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
                    <a href="/signup">Rejestracja</a>
                </button>
            </ul>
        </nav>
    );
}

 export default Navbar;