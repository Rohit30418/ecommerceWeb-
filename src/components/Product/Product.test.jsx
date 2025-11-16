import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { beforeEach, describe, expect, test, vi } from "vitest";
import * as reactRedux from "react-redux";


// ✅ MOCK ALL firestore functions used in ProductCard & firebase.js
const mockAddDoc = vi.fn(() => Promise.resolve({ id: "mockDocId" }));
const mockCollection = vi.fn(() => "mockCollectionRef");
const mockDoc = vi.fn(() => "mockDocRef");
const mockGetFirestore = vi.fn(() => "mockDb"); // ✅ added

// ✅ vi.mock for firebase/firestore (full)
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal(); // to retain other utilities if needed
  return {
    ...actual,
    getFirestore: mockGetFirestore,  // ✅ mock this too
    addDoc: mockAddDoc,
    collection: mockCollection,
    doc: mockDoc,
  };
});
// Mock product
const mockItem = {
  id: "123",
  title: "Test Product",
  price: 100,
  discountPercentage: 10,
  thumbnail: "test.jpg",
  rating: 4,
};

// ✅ Mock react-redux
vi.mock("react-redux", () => ({
  ...vi.importActual("react-redux"),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn(),
}));


describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test("renders product info", () => {
    render(
      <MemoryRouter>
        <ProductCard item={mockItem} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "test.jpg"
    );
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

    addDoc.mockResolvedValueOnce({ id: "doc123" }); // simulate success

    render(
      <MemoryRouter>
        <ProductCard item={mockItem} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText("add to cart"));

    expect(addDoc).toHaveBeenCalledWith(
      "mockCollection",
      expect.objectContaining({
        itemId: "123",
        title: "Test Product",
      })
    );
  });
});
