import { beforeAll, beforeEach, describe, expect } from "vitest";
import Header from "./Header";
import { fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../Redux/Store";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {vi} from "vitest"

describe("Header Component",()=>{

    beforeEach(()=>{
        localStorage.clear()
        vi.clearAllMocks();
        document.documentElement.className = ''
    })

    const HeaderComponent=()=>{
        return(
       <BrowserRouter><Provider store={store}>
     <Header/>
   </Provider>
   </BrowserRouter>
        )
    }
   
    it("should render header component",()=>{
    render(<HeaderComponent/>)
    })

    it("should render the cart items",()=>{
        render(<HeaderComponent></HeaderComponent>);
        expect(screen.getByText(/cart/i));
    })

    it("should render dark mode toggle",()=>{
        const toggleDarkMock = vi.fn();
        const modeToggler=screen.getByLabelText("modeToggle");

        expect(modeToggler);
          // Initial state (light)
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        fireEvent.click(modeToggler);
        expect(document.documentElement.classList.contains('dark')).toBe(true)
        expect(localStorage.getItem('darkMode')).toBe('true');

        fireEvent.click(modeToggler);
        expect(document.documentElement.classList.contains('dark')).toBe(false)
        expect(localStorage.getItem('darkMode')).toBe('false');
        expect(toggleDarkMock).toBeCalled();
    })


})