import chai from 'chai';
import chaiShallowDeepEqual from 'chai-shallow-deep-equal';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp).use(chaiShallowDeepEqual);

describe('Genshin Characters', () => {
  describe('GET /api/characters', () => {
    it('should get all character records', (done) => {
      chai
        .request(app)
        .get('/api/characters')
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  describe('POST /api/characters', () => {
    it('should create a new character', (done) => {
      const newCharacter = {
        name: 'Lumine',
        element: 'Dendro',
        weapon: 'Sword',
      };

      const expectedBody = {
        message: 'New character created',
        data: newCharacter,
      };

      chai
        .request(app)
        .post('/api/characters')
        .send(newCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(201);
          chai.expect(res.body).to.shallowDeepEqual(expectedBody);
          done();
        });
    });

    it('should not create a new character', (done) => {
      // Missing element and weapon
      const newCharacter = {
        name: 'Qiqi',
      };

      const expectedBody = {
        message: 'Missing element, weapon',
      };

      chai
        .request(app)
        .post('/api/characters')
        .send(newCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.deep.equal(expectedBody);
          done();
        });
    });
  });

  describe('GET /api/characters/:name', () => {
    it('should get an existing character', (done) => {
      const character = {
        name: 'Zhongli',
        element: 'Geo',
        weapon: 'Polearm',
      };

      const expectedBody = {
        message: 'Character retrieved',
        data: character,
      };

      chai
        .request(app)
        .get(`/api/characters/${character.name}`)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(expectedBody);
          done();
        });
    });

    it('should not get an non-existent character', (done) => {
      const character = {
        name: 'La Signora',
        element: 'Cryo',
        weapon: 'Catalyst',
      };

      const expectedBody = { message: 'Character not found' };

      chai
        .request(app)
        .get(`/api/characters/${character.name}`)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(404);
          chai.expect(res.body).to.deep.equal(expectedBody);
          done();
        });
    });
  });

  describe('PUT /api/characters/:name', () => {
    it('should update an existing character', (done) => {
      const oldCharacterName = 'Lumine';
      const updateCharacter = {
        name: 'Aether',
        element: 'Anemo',
        weapon: 'Sword',
      };

      const expectedBody = {
        message: 'Character updated!',
        data: updateCharacter,
      };

      chai
        .request(app)
        .put(`/api/characters/${oldCharacterName}`)
        .send(updateCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(expectedBody);
          done();
        });
    });

    it('should not update an non-existent character', (done) => {
      const oldCharacterName = 'Lumine';
      const updateCharacter = {
        name: 'Aether',
        element: 'Anemo',
        weapon: 'Sword',
      };

      const expectedBody = { message: 'Character not found' };

      chai
        .request(app)
        .put(`/api/characters/${oldCharacterName}`)
        .send(updateCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.deep.equal(expectedBody);
          done();
        });
    });
  });

  describe('DELETE /api/characters/:name', () => {
    it('should delete an existing character', (done) => {
      const deleteCharacter = {
        name: 'Aether',
        element: 'Anemo',
        weapon: 'Sword',
      };

      const expectedBody = {
        message: 'Character deleted',
        data: deleteCharacter,
      };

      chai
        .request(app)
        .delete(`/api/characters/${deleteCharacter.name}`)
        .send(deleteCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(200);
          chai.expect(res.body).to.shallowDeepEqual(expectedBody);
          done();
        });
    });

    it('should not delete a non-existent character', (done) => {
      const deleteCharacter = {
        name: 'Aether',
        element: 'Anemo',
        weapon: 'Sword',
      };

      const expectedBody = { message: 'Character not found' };

      chai
        .request(app)
        .delete(`/api/characters/${deleteCharacter.name}`)
        .send(deleteCharacter)
        .end((err, res) => {
          err && console.log(err);
          chai.expect(res).to.have.status(400);
          chai.expect(res.body).to.deep.equal(expectedBody);
          done();
        });
    });
  });
});
