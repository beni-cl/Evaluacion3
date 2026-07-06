import { useEffect, useMemo, useState } from 'react';
import PetCard from '../components/PetCard';
import UserPreferences from '../components/UserPreferences';

interface Pet {
  id: number;
  image: string;
  breed: string;
  type: string;
  name: string;
  age: string;
  size: string;
  description: string;
}

export default function Welcome() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('pet_spa_username') || 'Invitado';
    }
    return 'Invitado';
  });

  useEffect(() => {
    let cancelled = false;

    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        if (!response.ok) {
          throw new Error('No se pudo cargar la lista de Pokémon desde PokéAPI.');
        }

        const data = await response.json();
        const ages = ['2 meses', '1 año', '3 años', '6 meses', '2 años', '4 años', '5 meses', '1 año', '3 años', '8 meses', '4 años', '2 años'];
        const sizes = ['Pequeño', 'Mediano', 'Grande', 'Mediano', 'Pequeño', 'Grande', 'Pequeño', 'Mediano', 'Grande', 'Pequeño', 'Mediano', 'Grande'];

        const formattedPets = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }, index: number) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) {
              throw new Error(`No se pudo obtener la información de ${pokemon.name}.`);
            }

            const detailData = await detailResponse.json();
            const officialArtwork = detailData.sprites?.other?.['official-artwork']?.front_default;
            const image = officialArtwork || detailData.sprites?.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png';
            const types = detailData.types?.map((entry: { type: { name: string } }) => entry.type.name).join(' / ') || 'Normal';

            return {
              id: detailData.id,
              image,
              breed: detailData.types?.[0]?.type?.name || 'Normal',
              type: types,
              name: pokemon.name,
              age: ages[index] || '1 año',
              size: sizes[index] || 'Mediano',
              description: `Este Pokémon está listo para encontrar un hogar lleno de cariño y aventuras.`,
            };
          })
        );

        if (!cancelled) {
          setPets(formattedPets);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al cargar los Pokémon.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPets();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPets = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return pets;
    }

    return pets.filter((pet) =>
      pet.name.toLowerCase().includes(term) ||
      pet.breed.toLowerCase().includes(term) ||
      pet.type.toLowerCase().includes(term)
    );
  }, [pets, search]);

  const handleUsernameChange = (newName: string) => {
    const trimmedName = newName.trim() || 'Invitado';
    setUsername(trimmedName);
    window.localStorage.setItem('pet_spa_username', trimmedName);
  };

  return (
    <div className="app-container">
      <header>
        <div>
          <h1>Adopta a tu Pokémon</h1>
          <p>¡Hola, {username}! Descubre a tus futuros compañeros y elige con corazón.</p>
        </div>
        <UserPreferences onSaveName={handleUsernameChange} />
      </header>

      <main>
        <section className="hero-card">
          <div>
            <p className="eyebrow">Refugio de adopción</p>
            <h2>Encuentra un Pokémon listo para formar parte de tu familia.</h2>
            <p>Explora criaturas con historias únicas, tipos distintos y personalidades que esperan un hogar.</p>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre, tipo o especie..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="search-input"
          />
        </section>

        {loading && <p className="status">Cargando Pokémon disponibles para adopción...</p>}
        {error && <p className="status error">Error: {error}</p>}

        {!loading && !error && (
          <div className="pets-grid">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
            {filteredPets.length === 0 && <p className="no-results">No encontramos Pokémon que coincidan con tu búsqueda.</p>}
          </div>
        )}
      </main>
    </div>
  );
}


