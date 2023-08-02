
import { render, screen } from "@testing-library/react"
import DataForm from "./"

test("Access Tags | different types to access tags", async () => {


    render(<DataForm />)

    const elements = [
        screen.getByRole("button"),
        screen.getByTitle("click when ready"),

        screen.getByLabelText("Email"),
        screen.getByPlaceholderText("Red"),
        screen.getByDisplayValue("zain@gmail.com"),

        screen.getByText("Enter Data"),

        screen.getByAltText("data"),

        screen.getByTestId("image wrapper")
        

    ]

    for (let elem of elements) {

        expect(elem).toBeInTheDocument()
    }

})