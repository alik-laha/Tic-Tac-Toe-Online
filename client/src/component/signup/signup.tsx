import React, { useState, FormEvent } from 'react';
import '../login/login.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");


    const handleSubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        // You can perform login/authentication logic here
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
        // Reset the form
        setUsername('');
        setPassword('');
    };

    return (
        <div className="App">
            <div className="login-container">
                <h2>SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn-login">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;