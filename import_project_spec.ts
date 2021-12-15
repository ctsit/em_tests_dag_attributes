describe('Import project', () => {
    const moduleName = 'DAG Attributes';
    const moduleDir = 'dag_attributes';
    const Page = Cypress.env('page');
    const pid = 15;
    const ProjectType = Cypress.env('projectType')

    before(() => {
        cy.uiLogin("admin");
        cy.visitVersion({ page: Page.ExternalModules });
        cy.searchAndEnableGlobalModule(moduleName);

    });

    it('asserts project was created from xml', () => {
        const filename = 'dag_attributes_project.xml';
        cy.createProject('DAG Attributes', ProjectType.Practice, filename, moduleDir, pid);
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
        const filename = 'dag_attributes_definition.csv';
        cy.configureModule(moduleName, {
           'file_upload' : {
               fileName: filename,
               moduleDir: moduleDir
           }
        });
    });

    // create record for uf

    // verify correct forms are hidden
})
