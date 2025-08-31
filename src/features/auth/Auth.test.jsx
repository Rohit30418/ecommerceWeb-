import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, vi } from "vitest";
import Login from "./Login";
import * as firebaseAuth from "firebase/auth";
import { BrowserRouter } from "react-router-dom";


vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})), 
  signInWithEmailAndPassword: vi.fn(),
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Login Component", () => {
  afterEach(() => {
    vi.clearAllMocks(); // clear mocks after each test
  });

  test("renders form correctly", () => {
    renderWithRouter(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/Enter your email/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();
  });

  test("calls Firebase login with correct credentials", async () => {
    (firebaseAuth.signInWithEmailAndPassword).mockResolvedValue({
      user: { uid: "123" },
    });

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object), // auth instance
        "test@example.com",
        "password123"
      );
    });
  });

  test("shows error message on failed login", async () => {
    (firebaseAuth.signInWithEmailAndPassword).mockRejectedValue(
      new Error("Invalid credentials")
    );

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
