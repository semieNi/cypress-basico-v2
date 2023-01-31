/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Lion");
    cy.get("#lastName").type("Simon");
    cy.get("#email").type("lion123@gmail.com");
    cy.get("#open-text-area").type("Testando a aplicação.", { delay: 0 });
    cy.sendForm();
    cy.get(".success > strong").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Lion");
    cy.get("#lastName").type("Simon");
    cy.get("#email").type("lion123@gmail,com");
    cy.get("#open-text-area").type("Testando a aplicação.", { delay: 0 });
    cy.sendForm();
    cy.get(".error > strong").should("be.visible");
  });

  it("Validar campo telefone com valor não-numérico", () => {
    cy.get("#phone").type("abcabcabc").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Lion");
    cy.get("#lastName").type("Simon");
    cy.get("#email").type("lion123@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Testando a aplicação.", { delay: 0 });
    cy.sendForm();
    cy.get(".error > strong").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Lion")
      .should("have.value", "Lion")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Simon")
      .should("have.value", "Simon")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("lion123@gmail.com")
      .should("have.value", "lion123@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("123456789")
      .should("have.value", "123456789")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.sendForm();
    cy.get(".error > strong").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });
  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });
});
