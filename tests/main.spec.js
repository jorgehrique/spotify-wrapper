import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main'
chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Spotify Wrapper', () => {

  describe('Smoke Tests', () => {
    it('should exist a method ´search´', () => {
      expect(search).to.exist.and.to.be.a('function')
    })

    it('should exist a method ´searchAlbums´', () => {
      expect(searchAlbums).to.exist.and.to.be.a('function')
    })

    it('should exist a method ´searchArtists´', () => {
      expect(searchArtists).to.exist.and.to.be.a('function')
    })

    it('should exist a method ´searchTracks´', () => {
      expect(searchTracks).to.exist.and.to.be.a('function')
    })

    it('should exist a method ´searchPlaylists´', () => {
      expect(searchPlaylists).to.exist.and.to.be.a('function')
    })
  })

  describe('Generic Search', () => {
    let fetchedStub, promisse

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch')
      fetchedStub.resolves({ body: () => { } });
    })

    afterEach(() => {
      fetchedStub.restore()
    })

    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    })

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {
        const artists = search('Incubus', 'artist')
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

        const albums = search('Incubus', 'album')
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
      })

      context('passing more then one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      })

      it('should return the JSON data from the promisse', () => {
        const artists = search('Incubus', 'artist')
        expect(artists.resolveValue).to.be.eql({ json: () => { } })
      });

    });


  })
}) 