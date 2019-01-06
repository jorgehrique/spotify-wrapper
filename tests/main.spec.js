import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main'
chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Spotify Wrapper', () => {
  let fetchedStub, promisse

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    fetchedStub.resolves({ body: () => { } });
  })

  afterEach(() => {
    fetchedStub.restore()
  })

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
    });

    it.skip('should return the JSON data from the promisse', () => {
      const artists = search('Incubus', 'artist')
      expect(artists.resolveValue).to.be.eql({ json: () => { } })
    });

  })

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      const artists = searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = searchArtists('Muse')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')       
    });
  });

  describe('Search Album', () => {
    it('should call fetch function', () => {
      const album = searchAlbums('Make Yourself')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      const album = searchAlbums('Make Yourself')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Make Yourself&type=album')

      const album2 = searchAlbums('Morning View')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Morning View&type=album')       
    });
  });

  describe('Search Track', () => {
    it('should call fetch function', () => {
      const track = searchTracks('Southern Girl')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      const track = searchTracks('Southern Girl')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Southern Girl&type=track')

      const track2 = searchTracks('Are you in?')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Are you in?&type=track')       
    });
  });

  describe('Search Playlist', () => {
    it('should call fetch function', () => {
      const playlist = searchPlaylists('This is Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with the correct url', () => {
      const playlist = searchPlaylists('This is Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=This is Incubus&type=playlist')

      const playlist2 = searchPlaylists('Best of Incubus')
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Best of Incubus&type=playlist')       
    });
  });


}) 