import { useEffect, useState, type FormEvent } from 'react';

interface UserPreferencesProps {
  onSaveName: (newName: string) => void;
}

const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

export default function UserPreferences({ onSaveName }: UserPreferencesProps) {
  const [inputName, setInputName] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = (getCookieValue('app_pet_theme') as 'light' | 'dark' | null) || 'light';
    setTheme(savedTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: 'light' | 'dark' = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(nextTheme);
    document.cookie = `app_pet_theme=${nextTheme}; max-age=${7 * 24 * 60 * 60}; path=/`;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (inputName.trim()) {
      onSaveName(inputName);
      setInputName('');
    }
  };

  return (
    <div className="preferences-panel">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Tu nombre"
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
        />
        <button type="submit">Guardar</button>
      </form>

      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
      </button>
    </div>
  );
}


