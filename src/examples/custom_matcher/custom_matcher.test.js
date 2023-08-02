import { render, screen, within } from "@testing-library/react"
import Form from "./"

function toContainRole(container, role, quantity = 1) {

    const elements = within(container).queryAllByRole(role);
    return {
        pass: elements.length === quantity,
        message: () => elements.length === quantity ? "matched" : "not matched"
    }

}
expect.extend({ toContainRole })

test("Custom Matcher | it should count form buttons", async () => {

    render(<Form />)

    const form = screen.getByRole("form")

    // method 1 
    const buttons = within(form).getAllByRole("button");
    expect(buttons).toHaveLength(2)

    // method 2 with custom matcher
    expect(form).toContainRole("button", 2)

})