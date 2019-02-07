import decode from 'jwt-decode'

export default class ChatService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://localhost:4000/v1' // API server domain
    this.fetch = this.fetch.bind(this) // React binding stuff
  }

  create(roomInfo) {
    return this.fetch(`${this.domain}/chatroom`, {
      method: 'POST',
      body: JSON.stringify(roomInfo)
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  join(roomInfo) {
    return this.fetch(`${this.domain}/chatroom/join/${roomInfo.id}`, {
      method: 'POST',
      body: JSON.stringify(roomInfo)
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  createMessage(messageInfo) {
    return this.fetch(
      `${this.domain}/chatroom/history/${messageInfo.chatroom}`,
      {
        method: 'POST',
        body: JSON.stringify(messageInfo)
      }
    ).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  get() {
    return this.fetch(`${this.domain}/chatroom`, {
      method: 'GET'
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  getChatroom(chatroomId) {
    return this.fetch(`${this.domain}/chatroom/${chatroomId}`, {
      method: 'GET'
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  getHistory(chatroomId) {
    return this.fetch(`${this.domain}/chatroom/history/${chatroomId}`, {
      method: 'GET'
    }).then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true
      } else return false
    } catch (err) {
      return false
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
