import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./Accordion";

describe("Accordion Component", () => {
  test("renders all FAQ questions", () => {
    render(<Accordion />);
    expect(screen.getByText("What payment methods do you accept?")).toBeInTheDocument();
    expect(screen.getByText("How can I track my order?")).toBeInTheDocument();
  });

  test("opens and closes an accordion item", () => {
    render(<Accordion />);
    const question = screen.getByText("What payment methods do you accept?");

    // open
    fireEvent.click(question);
    expect(screen.getByText(/We accept all major credit/i)).toBeInTheDocument();

    // close
    fireEvent.click(question);
    expect(screen.queryByText(/We accept all major credit/i)).not.toBeInTheDocument();
  });
});
