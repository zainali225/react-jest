import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm"
import UserList from "./UserList"

test("UserForm | show to inputs and add button", async () => {
    render(<UserForm />);

    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();

})


test("UserForm | it calls onUserAdd on submit form", async () => {

    // not best  without mock;

    // const argList = [];
    // const callBack = (...args) => {
    //     argList.push(args)
    // };


    // with mock
    const mock = jest.fn()

    render(<UserForm onUserAdd={mock
        //callBack
    } />);

    // get inputs : not best solution
    // const [nameInput, emailInput] = screen.getAllByRole("textbox");

    // get inputs: good approach and recommended
    const nameInput = screen.getByRole("textbox", { name: /enter name/i })
    const emailInput = screen.getByRole("textbox", { name: /enter email/i })

    user.click(nameInput);
    user.keyboard("zain");

    user.click(emailInput);
    user.keyboard("zain@gmail.com");


    const button = screen.getByRole("button");
    user.click(button);

    // not best
    // expect(argList).toHaveLength(1);
    // expect(argList[0][0]).toEqual({ name: "zain", email: "zain@gmail.com" })

    // with mock
    expect(mock).toBeCalled();
    expect(mock).toBeCalledWith({ name: "zain", email: "zain@gmail.com" })


});


// user list

test("UserList | it show correct number of rows", async () => {

    const users = [
        { name: "zain", email: "zain@gmail.com" },
        { name: "ali", email: "ali@gmail.com" },
    ]


    // 1st way using setting datatest-id in users list
    // render(<UserList users={users} />);

    // const rows = within(screen.getByTestId("users")).getAllByRole("row");


    // 2nd way

    const { container } = render(<UserList users={users} />);
    const rows = container.querySelectorAll("tbody tr")

    expect(rows).toHaveLength(2)

    // online find elements
    // screen.logTestingPlaygroundURL()

});

test("UserList | it show correct name & email", async () => {

    const users = [
        { name: "zain", email: "zain@gmail.com" },
        { name: "ali", email: "ali@gmail.com" },
    ]


    render(<UserList users={users} />)

    for (let user of users) {

        const name = screen.getByRole("cell", { name: user.name })
        const email = screen.getByRole("cell", { name: user.email })

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }

    // online find elements
    // screen.logTestingPlaygroundURL()

});