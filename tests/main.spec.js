import { expect } from 'chai'
import { search, searchAlbuns, searchArtists, searchTracks, searchPlaylists } from '../src/main'

describe('Spotify Wrapper', () => {

  describe('Smoke Tests', () => {
    it('should exist a method ´search´', () => {
      expect(search).to.exist.and.to.be.a('function')
    })

    it('should exist a method ´searchAlbuns´', () => {
      expect(searchAlbuns).to.exist.and.to.be.a('function')
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
})