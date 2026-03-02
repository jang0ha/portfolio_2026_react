import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout/_AppHeader.scss';

export default function AppHeader() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            const media = window.matchMedia('(prefers-color-scheme: dark)');
            return media.matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="header container">
            <div className="header-block">
                <h1>
                    <Link to="/" className="logo"
                    >0&emsp;&emsp;H<br />/&emsp;&emsp; JANG<span>&ensp;PORTFOLIO React</span></Link
                    >
                </h1>
                <Link to="/about" className="menu">About</Link>
                <button
                    type="button"
                    className="btn_theme"
                    aria-label="라이트/다크모드 전환 버튼"
                    onClick={toggleTheme}
                >
                    <span>
                        {theme === 'light' ? '☀️' : '🌙'}
                        <span className="hide">{theme === 'light' ? '라이트모드로 보는중' : '다크모드로 보는중'}</span>
                    </span>
                </button>
            </div>
        </header>
    )
}