import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // Récupération des données et des erreurs
  const [type, setType] = useState(null); // State pour gérer le type de catégorie sélectionné
  const [currentPage, setCurrentPage] = useState(1);  // State pour suivre la page courante dans la pagination
  const [filteredEvents, setfilteredEvents] = useState([]) // State pour contenir les événements filtrés affichés sur la page actuelle
  const [pageNumber, setPageNumber] = useState(0) // State pour le nombre total de pages nécessaires pour afficher tous les événements filtrés

  useEffect(() => {
    // filtre les événements en fonction du type sélectionné, ou affiche tous les événements si aucun type n'est sélectionné
    const filteredEventsAll = (data?.events || []).filter((event) => !type || event.type === type)
    // découpe les événements filtrés en fonction de la pagination
    const paginatedEvents = filteredEventsAll.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    // Met à jour le state avec les événements paginés
    setfilteredEvents(paginatedEvents)
    // Calcule le nombre total de pages nécessaires
    setPageNumber(Math.ceil(filteredEventsAll.length / PER_PAGE));
  }, [data, type, currentPage])
 // Fonction pour changer de catégorie, réinitialise à la première page
  const changeType = (evtType) => {
    setCurrentPage(1); 
    setType(evtType);
  };
  // Génère une liste unique des types d'événements (catégories) disponibles
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;