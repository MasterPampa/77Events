import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./index";

describe("When Form is submitted", () => {
  it("the success action is called", () => {
    const onSuccessMock = jest.fn(); // Créez une fonction mock pour onSuccess
    render(<Form onSuccess={onSuccessMock} onError={() => {}} />);
    
    const submitButton = screen.getByRole("button", { name: "Envoyer" }); // Utilisez getByRole avec le nom du bouton
    fireEvent.click(submitButton); // Simule un clic sur le bouton Envoyer
    
    expect(onSuccessMock).toHaveBeenCalled(); // Vérifie si onSuccess a été appelé
  });
});
