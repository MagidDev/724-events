import Menu from "../../containers/Menu";
import ServiceCard from "../../components/ServiceCard";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";

import EventList from "../../containers/Events";
import Slider from "../../containers/Slider";
import Logo from "../../components/Logo";
import Icon from "../../components/Icon";
import Form from "../../containers/Form";
import Modal from "../../containers/Modal";
import ModalEvent from "../../containers/ModalEvent";
import { useData } from "../../contexts/DataContext";
import "./style.scss";

const Page = () => {
  const { data } = useData();

  // Récupération de la dernière prestation
  const last = data?.events?.[data.events.length - 1];

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer">
          <Slider />
        </section>
        <section className="ServicesContainer" id="services">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
              <h3>Soirée d&apos;entreprise</h3>
              Une soirée d&apos;entreprise permet de réunir vos équipes pour un moment convivial afin de valoriser votre société.
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events organise votre évènement quelle que soit sa taille, en trouvant le lieu parfait et des solutions innovantes.
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri-LFXMtUuAKK8-unsplash1.png">
              <h3>Expérience digitale</h3>
              Nous proposons des contenus immersifs pour la réalité virtuelle, augmentée et mixte pour vos événements.
            </ServiceCard>
          </div>
        </section>
        <section className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>
        <section className="PeoplesContainer" id="team">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d&apos;experts dédiée à l&apos;organisation de vos événements</p>
          <div className="ListContainer">
            <PeopleCard imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png" name="Samira" position="CEO" />
            <PeopleCard imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png" name="Jean-baptiste" position="Directeur marketing" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-SJvDxw0azqw-unsplash.png" name="Alice" position="CXO" />
            <PeopleCard imageSrc="/images/jonas-kakaroto-KIPqvvTOC1s-unsplash.png" name="Luís" position="Animateur" />
            <PeopleCard imageSrc="/images/amy-hirschi-b3AYk8HKCl0-unsplash1.png" name="Christine" position="VP animation" />
            <PeopleCard imageSrc="/images/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.png" name="Isabelle" position="VP communication" />
          </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>Merci pour votre message, nous vous répondrons dans les plus brefs délais.</p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)}
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>

      <footer className="row">
        {/* Section dernière prestation */}
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {last && (
            <Modal key={last.id} Content={<ModalEvent event={last} />}>
              {({ setIsOpened }) => (
                <EventCard
                  onClick={() => setIsOpened(true)}
                  imageSrc={last.cover}
                  title={last.title}
                  date={new Date(last.date)}
                  label={last.type}
                />
              )}
            </Modal>
          )}
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            <a href="#twitch">
              <Icon name="twitch" />
            </a>
            <a href="#facebook">
              <Icon name="facebook" />
            </a>
            <a href="#twitter">
              <Icon name="twitter" />
            </a>
            <a href="#youtube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations de service
            spécialisées dans la conception et l&apos;organisation de divers événements
            tels que des événements festifs, des manifestations sportives et
            culturelles, des événements professionnels
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;
