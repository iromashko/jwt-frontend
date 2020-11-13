/// <reference types="Cypress" />

var chance = require("chance")();

describe("JWT Viewer", () => {
  const username = chance.name();
  const password = "Password131";

  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });

  it("Show Home Page", () => {
    cy.get("[data-cy=jwtLogo]").should("be.visible");
    cy.get("[data-cy=loginButton]").should("be.visible");
    cy.get("[data-cy=registerButton]").should("be.visible");
    cy.get("[data-cy=profileMenu]").should("not.be.visible");

    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem("jwtToken")).to.be.null;
    });
  });
  it("Register User", () => {
    cy.get("[data-cy=registerButton]").click();
    cy.get("[data-cy=registerForm]").should("be.visible");
    cy.get("[data-cy=registerUsername]").type(username);
    cy.get("[data-cy=registerPassword]").type(password);
    cy.get("[data-cy=registerSubmit]").click();
    cy.get("[data-cy=loginForm]").should("be.visible");
  });
  it("Login User", () => {
    cy.get("[data-cy=loginButton]").click();
    cy.get("[data-cy=loginForm]").should("be.visible");
    cy.get("[data-cy=loginUsername]").type(username);
    cy.get("[data-cy=loginPassword]").type(password);
    cy.get("[data-cy=loginSubmit]").click();
    cy.get("[data-cy=tokenArea]").should("be.visible");
    cy.get("[data-cy=profileName]").should("contain", username);
  });
  it("Show Token", () => {
    cy.get("[data-cy=loginButton]").click();
    cy.get("[data-cy=loginForm]").should("be.visible");
    cy.get("[data-cy=loginUsername]").type(username);
    cy.get("[data-cy=loginPassword]").type(password);
    cy.get("[data-cy=loginSubmit]").click();
    cy.get("[data-cy=tokenArea]").should("be.visible");
    cy.get("[data-cy=tokenArea]").should(($el) => {
      expect($el).contain(localStorage.getItem("jwtToken"));
    });
  });

  it("Menu Animation", () => {
    cy.viewport(500, 700);
    cy.get("[data-cy=loginButton]").click();
    cy.get("[data-cy=loginForm]").should("be.visible");
    cy.get("[data-cy=loginUsername]").type(username);
    cy.get("[data-cy=loginPassword]").type(password);
    cy.get("[data-cy=loginSubmit]").click();
    cy.get("[data-cy=arrow]").should("be.visible");
    cy.get("[data-cy=profileName]").should("not.be.visible");
    cy.get("[data-cy=arrow]").click();
    cy.wait(1000);
    cy.get("[data-cy=arrow]").should(
      "have.css",
      "transform",
      "matrix(-1, 1.22465e-16, -1.22465e-16, -1, 0, 0)"
    );
  });
  it("Logout User", () => {
    cy.get("[data-cy=loginButton]").click();
    cy.get("[data-cy=loginUsername]").type(username);
    cy.get("[data-cy=loginPassword]").type(password);
    cy.get("[data-cy=loginSubmit]").click();
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem("jwtToken")).to.be.null;
      expect(ls.getItem("username")).to.be.null;
    });
  });
});
