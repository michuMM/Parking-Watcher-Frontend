import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Signup = () => {
    const [startDate, setStartDate] = useState(null);
    
    return (
        <div className="flex justify-center items-center">
            <form className="w-96 p-6 shadow-lg bg-white rounded">
                <h1 className="text-[24px]">Zarejestruj się</h1>
                <hr className="mt-2" /> 
                <div className="mt-6">
                    <label for="username" className="block">Nazwa użytkownika</label>
                    <input placeholder="podaj nazwę użytkownika" className="mt-1 border w-full text-base px-2 py-1 rounded-lg" />
                </div>
                <div className="mt-6">
                    <label for="username" className="block">Email</label>
                    <input placeholder="podaj email" className="mt-1 border w-full text-base px-2 py-1 rounded-lg" />
                </div>
                <div className="mt-6">
                    <label for="username" className="block">Hasło</label>
                    <input placeholder="podaj hasło" type="password" className="mt-1 border w-full text-base px-2 py-1 rounded-lg" />
                </div>
                <div className="mt-6">
                    <label for="username" className="block">Potwierdź hasło</label>
                    <input placeholder="podaj hasło" type="password" className="mt-1 border w-full text-base px-2 py-1 rounded-lg" />
                </div>
                <div className="mt-6">
                    <label for="username" className="block">Nr telefonu</label>
                    <input placeholder="podaj nr telefonu" type="password" className="mt-1 border w-full text-base px-2 py-1 rounded-lg" />
                </div>
                <ReCAPTCHA
                    sitekey="6LeeSrQpAAAAAG4D2ZK0-6sAcu7AGFfdDmeVQ9Nf"
                    className="rounded-lg mt-3"
                />
                <button class="bg-cyan-400 text-white duration-500 mt-3 px-6 py-2 hover:bg-cyan-500 rounded">
                    <label>Zarejestruj się</label>
                </button>
            </form>

        </div>
    );
}

 export default Signup;