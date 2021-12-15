describe('Import project', () => {
    const moduleName = 'DAG Attributes';
    const Page = Cypress.env('page');
    const Path = Cypress.env('path');
    const pid = 15;
    const ProjectType = Cypress.env('projectType')

    before(() => {
        cy.uiLogin("admin");
        cy.visitVersion({ page: Page.ExternalModules });
        cy.searchAndEnableGlobalModule(moduleName);

    });

    it('asserts project was created from xml', () => {
        const filename = 'dag_attributes_project.xml';
        cy.createCdiscProject('DAG Attributes', ProjectType.Practice, `${Path.cdisc}/${filename}`, pid);
    })

    it('asserts module was enabled for project', () => {
        cy.visitVersion({ page: Page.ProjectExternalModules, params: `pid=${pid}`})
        cy.searchAndEnableProjectModule(moduleName);
        cy.getEnabledModuleTableEntry(moduleName).should(($t) => {
            expect($t).to.contain(moduleName);
        });
    })

    // assert that the csv was properly loaded
    it('asserts csv was properly uploaded', () => {
        const filename = 'dag_attributes.csv';
        cy.configureModule(moduleName, {
           'file_upload' : `cypress/fixtures/${Path.cdisc}/${filename}`
        });
    });

    // create record for uf

    // verify correct forms are hidden
})
