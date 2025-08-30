import { screen ,render,fireEvent,waitFor} from "@testing-library/react";
import { afterEach, describe, expect, vi } from "vitest";
import Login from "/Login";
import * as firebaseAuth from "firebase/auth";
import { BrowserRouter } from "react-router-dom";


vi.mock("firebase/auth",()=>({
   signInWithEmailAndPassword:vi.fn(),
}));

const renderwithRouter=(ui)=>render(<BrowserRouter>{ui}</BrowserRouter>)

describe("Login Component",()=>{
    afterEach(()=>{
        vi.clearAllMocks();
    })
});

test("renders form correctly",()=>{
    renderwithRouter(<Login></Login>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button",{name:/login/i})).toBeInTheDocument();
})

test("validation errors when fields are empty",async()=>{
       renderwithRouter(<Login></Login>);
       fireEvent.click(screen.getByRole("button",{name:/login/i}));
       expect(await screen.findByAltText(/enter your email/i)).toBeInTheDocument();
       expect(await screen.findByText(/Enter your password/i)).toBeInTheDocument();
})