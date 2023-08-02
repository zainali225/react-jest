import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm"
import UserList from "./UserList"
import App from "./"

function renderComponentUserList() {

    const users = [
        { name: "zain", email: "zain@gmail.com" },
        { name: "ali", email: "ali@gmail.com" },
    ]


    const { container } = render(<UserList users={users} />)

    return { users, container }

}

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

test("User Form | it clear the inputs after submitting form", async () => {

    render(<UserForm onUserAdd={() => { }} />)

    const nameInput = screen.getByRole("textbox", { name: /enter name/i })
    const emailInput = screen.getByRole("textbox", { name: /enter email/i })
    const button = screen.getByRole("button", { name: /add user/i })

    user.click(nameInput);
    user.keyboard("zain")

    user.click(emailInput);
    user.keyboard("zain@gmail.com")

    await user.click(button);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("")

})


// user list

test("UserList | it show correct number of rows", async () => {




    // 1st way using setting datatest-id in users list
    // render(<UserList users={users} />);

    // const rows = within(screen.getByTestId("users")).getAllByRole("row");


    // 2nd way

    const { container } = renderComponentUserList();
    const rows = container.querySelectorAll("tbody tr")

    expect(rows).toHaveLength(2)

    // online find elements
    // screen.logTestingPlaygroundURL()

});

test("UserList | it show correct name & email", async () => {


    const { users } = renderComponentUserList()


    for (let user of users) {

        const name = screen.getByRole("cell", { name: user.name })
        const email = screen.getByRole("cell", { name: user.email })

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }

    // online find elements
    // screen.logTestingPlaygroundURL()

});


test("User/App.js | it should work as expected", async () => {

    render(<App />);

    const nameInput = screen.getByRole("textbox", { name: /enter name/i })
    const emailInput = screen.getByRole("textbox", { name: /enter email/i })

    const button = screen.getByRole('button', { name: /add user/i })

    user.click(nameInput);
    user.keyboard("zain");

    user.click(emailInput);
    user.keyboard("zain@gmail.com");

    await user.click(button);


    // screen.debug()
    // screen.logTestingPlaygroundURL()

    const name = screen.getByRole("cell", { name: "zain" })
    const email = screen.getByRole("cell", { name: "zain@gmail.com" })

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()



})