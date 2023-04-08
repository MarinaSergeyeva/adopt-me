import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "./Carousel";
import Modal from "./Modal";
import fetchPet from "./fetchPet";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">Loading...</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <h2>{pet.name}</h2>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </h2>
      {showModal ? (
        <Modal>
          <div>
            <h2>Would you like to adopt {pet.name}?</h2>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
