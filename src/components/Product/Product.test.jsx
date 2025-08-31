import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // ✅ add this
import ProductCard from "./ProductCard";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as reactRedux from "react-redux";

const mockItem = {
  id: "123",
  title: "Test Product",
  price: 100,
  discountPercentage: 10,
  thumbnail: "test.jpg",
  rating: 4,
};

// ✅ mock react-redux
vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn(),
}));

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("renders product info", () => {
    render(
      <MemoryRouter>   {/* ✅ wrap inside router */}
        <ProductCard item={mockItem} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute("src", "test.jpg");
  });

  test("adds to localStorage if no userId", () => {
    reactRedux.useSelector.mockReturnValue(undefined);
    render(
      <MemoryRouter>
        <ProductCard item={mockItem} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByLabelText("add to cart"));

    const cart = JSON.parse(localStorage.getItem("cartItem"));
    expect(cart[0].title).toBe("Test Product");
  });

  test("adds to Firestore if userId exists", async () => {
    reactRedux.useSelector.mockReturnValue("user123");

    const mockAddDoc = vi.fn();
    vi.mock("../firebaseApi", () => ({
      addToCartDoc: mockAddDoc
    }));

    render(
      <MemoryRouter>
        <ProductCard item={mockItem} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByLabelText("add to cart"));

    expect(mockAddDoc).toHaveBeenCalledWith("user123", mockItem);
  });
});
