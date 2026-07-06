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

interface PetCardProps {
  pet: Pet;
}

export default function PetCard({ pet }: PetCardProps) {
  return (
    <article className="pet-card">
      <div className="image-container">
        <img src={pet.image} alt={pet.name} className="pet-image" />
      </div>
      <div className="pet-info">
        <p className="pet-badge">{pet.breed}</p>
        <h3>{pet.name}</h3>
        <p>{pet.description}</p>
        <ul className="pet-stats">
          <li>
            <strong>Tipo:</strong> {pet.type}
          </li>
          <li>
            <strong>Edad:</strong> {pet.age}
          </li>
          <li>
            <strong>Tamaño:</strong> {pet.size}
          </li>
        </ul>
        <button className="adopt-button" onClick={() => window.alert(`¡Gracias por interesarte en adoptar a ${pet.name}!`)}>
          Adoptar
        </button>
      </div>
    </article>
  );
}

