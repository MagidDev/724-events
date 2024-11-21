import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assure que byDateDesc est toujours un tableau
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  // Fonction pour passer à la slide suivante
  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex + 1 < byDateDesc.length ? prevIndex + 1 : 0
    );
  };

  // Gestion de l'effet pour changer de slide automatiquement
  useEffect(() => {
    const timeout = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeout); // Nettoie le timeout pour éviter les fuites
  }, [index, byDateDesc.length]);

  // Rendu des slides
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id || idx} // Utilisation d'une clé unique basée sur l'id ou l'index si l'id est absent
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          {event.cover ? (
            <img src={event.cover} alt={event.title} />
          ) : (
            <div className="SlideCard__error">Aucune image disponible</div>
          )}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, idx) => (
            <input
              key={`pagination-${event.id || idx}`} // Clé unique basée sur l'id ou l'index si l'id est absent
              type="radio"
              name="radio-button"
              checked={index === idx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
