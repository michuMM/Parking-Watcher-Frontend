import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Tutaj możesz dodać logikę do obsługi zmiany hasła
        console.log("Stare hasło:", oldPassword);
        console.log("Nowe hasło:", newPassword);
        console.log("Potwierdź nowe hasło:", confirmPassword);
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg bg-white rounded">
                <h1 className="text-[24px]">Change password</h1>
                <hr className="mt-2" /> 
                <div className="mt-6">
                    <label htmlFor="oldPassword" className="block">Old password</label>
                    <input 
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Type old password" 
                        className="mt-1 border w-full text-base px-2 py-1 rounded-lg" 
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="newPassword" className="block">New password</label>
                    <input 
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Type new password" 
                        className="mt-1 border w-full text-base px-2 py-1 rounded-lg" 
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="confirmPassword" className="block">Reenter new password</label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Reenter new password" 
                        className="mt-1 border w-full text-base px-2 py-1 rounded-lg" 
                    />
                </div>
                {/* <ReCAPTCHA
                    sitekey="6LeeSrQpAAAAAG4D2ZK0-6sAcu7AGFfdDmeVQ9Nf"
                    className="rounded-lg mt-3"
                /> */}
                <button 
                    type="submit"
                    className="bg-cyan-400 text-white duration-500 mt-3 px-6 py-2 hover:bg-cyan-500 rounded"
                >
                    Change password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
