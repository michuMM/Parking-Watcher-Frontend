import siteLogo from '../assets/png/logo-no-background.png'

const Navbar = () => {
    return (
        <nav className="bg-white text-black h-28 p-4 flex justify-between items-center">
            {/* Logo po lewej stronie */}
            <div className="flex items-center">
                <img src={siteLogo} alt="Logo" className="h-14 mr-12" />
            </div>
            {/* Zakładki po prawej stronie */}
            <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:text-gray-300">Rejestracja</a>
                <a href="#" className="text-white hover:text-gray-300">Logowanie</a>
            </div>
            <ul class="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
                <li class="mx-4 my-6 md:my-0">
                    <a href="#" class="text-xl hover:text-cyan-500 duration-500">HOME</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="#" class="text-xl hover:text-cyan-500 duration-500">SERVICE</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="#" class="text-xl hover:text-cyan-500 duration-500">ABOUT</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="#" class="text-xl hover:text-cyan-500 duration-500">CONTACT</a>
                </li>
                <li class="mx-4 my-6 md:my-0">
                    <a href="#" class="text-xl hover:text-cyan-500 duration-500">BLOG'S</a>
                </li>

                <button class="bg-cyan-400 text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-cyan-500 rounded ">
                    Get started
                </button>
                <h2 class=""></h2>
            </ul>
        </nav>
    );
}

 export default Navbar;