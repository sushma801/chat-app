import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { describe, expect, it } from "vitest";
import { AuthContextProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("Login page", () => {
  it("renders the login component", async () => {
    const href = "/";

    const { container } = render(
      <MemoryRouter>
        <AuthContextProvider>
          <Login />
        </AuthContextProvider>
      </MemoryRouter>
    );
    expect(container).toBeTruthy();
    const heading = container.querySelector("div div h1");
    expect(heading).toHaveTextContent("Login ChatApp");
    const formContainer = container.querySelector("div div form");
    const inputFields = formContainer.querySelectorAll("input");
    expect(inputFields).toHaveLength(2);
    expect(formContainer.querySelector("a")).toHaveTextContent(
      "Don't have an account?"
    );
    const anchorTag = formContainer.querySelector("a");
    fireEvent.click(anchorTag);
    // TODO: check the sign up page is render or not

    // TODO: add the value to the input field and check the login button
    // Find and interact with elements
    const usernameInput = screen.getByLabelText(/userName/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe(href);
  });
});
