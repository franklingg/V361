const chai = require('chai');
const chai_http = require('chai-http');
const should = chai.should();
const server = require('../src/server');
const databaseConfig = require('../src/config/database');
const httpCodes = require('./status');

chai.use(chai_http);

let taskListId;
let taskId;

describe('Tag Test', async function () {
    it('Criar Tag', async function () {
        const response = await chai.request(server)
            .post('/tags')
            .send({ 'title': 'Test Tag', 'color': "#A930FD" });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.be.a('object');
        response.body.should.have.property('title');
        response.body.should.have.property('color');
        response.body.should.have.property('textColor');
    });

    it('Buscar Tag', async function () {
        const response = await chai.request(server)
            .get('/tags');
        response.should.have.status(httpCodes.success.OK);
        response.body.should.be.an('array');
        response.body.should.have.lengthOf(1);
    });

    it('Buscar Tag específica', async function () {
        const response = await chai.request(server)
            .get(`/tags/Test_Tag`);
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({title: "Test Tag", color: "#A930FD", textColor: "#FFF"});
    });

    it('Atualizar Tag', async function () {
        const response = await chai.request(server)
            .put(`/tags/Test_Tag`)
            .send({ 'textColor': '#EEE' });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({title: "Test Tag", color: "#A930FD", textColor: "#EEE"});
    });
});

describe('Task List Test', async function () {
    before(function () {
        databaseConfig();
    });
    
    it('Criar lista de tarefas', async function () {
        const response = await chai.request(server)
            .post('/task_lists')
            .send({ 'name': 'Test Task List 1', 'color': "#CCC" });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('color');
        taskListId = response.body._id;
    });

    it('Buscar lista de tarefas', async function () {
        const response = await chai.request(server)
            .get('/task_lists');
        response.should.have.status(httpCodes.success.OK);
        response.body.should.be.an('array');
        response.body.should.have.lengthOf(1);
    });

    it('Buscar Lista de Tarefas específica', async function () {
        const response = await chai.request(server)
            .get(`/task_lists/${taskListId}`);
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task List 1", color: "#CCC"});
    });

    it('Atualizar Lista de Tarefas', async function () {
        const response = await chai.request(server)
            .put(`/task_lists/${taskListId}`)
            .send({ 'color': '#CCC' });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task List 1", color: "#CCC"});
    });
    
});

describe('Task Test', async function () {
    it('Criar tarefa', async function () {
        const response = await chai.request(server)
            .post('/tasks')
            .send({ 'name': 'Test Task 1', 'task_list_id': taskListId });
        response.should.have.status(httpCodes.success.CREATED);
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('done');
        taskId = response.body._id;
    });

    it('Buscar tarefas', async function () {
        const response = await chai.request(server)
            .get('/tasks');
        response.should.have.status(httpCodes.success.OK);
        response.body.should.be.an('array');
        response.body.should.have.lengthOf(1);
    });

    it('Buscar Tarefa específica', async function () {
        const response = await chai.request(server)
            .get(`/tasks/${taskId}`);
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task 1"});
    });

    it('Atualizar Tarefa', async function () {
        const response = await chai.request(server)
            .put(`/tasks/${taskId}`)
            .send({ 'start_date': '2000-12-15' });
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task 1", start_date: '2000-12-15T00:00:00.000Z'});
    });

    it('Marcar como concluída', async function () {
        const response = await chai.request(server)
            .patch(`/tasks/${taskId}/done`);
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task 1", done: true});
    });

    it('Marcar como não-concluída', async function () {
        const response = await chai.request(server)
            .patch(`/tasks/${taskId}/not_done`);
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task 1", done: false});
    });

    it('Adicionar tags', async function () {
        const response = await chai.request(server)
            .put(`/tasks/${taskId}/tags`)
            .send({tags: ['Test Tag']});
        response.should.have.status(httpCodes.success.OK);
        response.body.should.include({name: "Test Task 1"});
        response.body.tags.should.have.lengthOf(1);
        response.body.tags[0].should.include({title: "Test Tag", color: '#A930FD' });
    });

});

describe('Deletions Test', async () => {
    it('Deletar Tarefa', async function () {
        const response = await chai.request(server)
            .delete(`/tasks/${taskId}`)
        response.should.have.status(httpCodes.success.DELETED);
        response.body.should.be.eql({});
    });

    it('Deletar Tag', async function () {
        const response = await chai.request(server)
            .delete(`/tags/Test_Tag`)
        response.should.have.status(httpCodes.success.DELETED);
        response.body.should.be.eql({});
    });

    it('Deletar Lista de Tarefas', async function () {
        const response = await chai.request(server)
        .delete(`/task_lists/${taskListId}`)
        response.should.have.status(httpCodes.success.DELETED);
        response.body.should.be.eql({});
    });
});