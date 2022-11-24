export class Fetcher {
  static instance: Fetcher | undefined

  static getInstance() {
    if (this.instance !== undefined) return this.instance
    this.instance = new Fetcher()
    return this.instance
  }

  /**
   * @description sends request to API server using window.fetch with given url and options returns received data
   *              If the network call results in some error throws a HTTP error with status and reason
   * @param {String} url
   * @param {Object} options
   */
  sendRequest = async (url: string, options: object) => {
    /**
     * Call global/window fetch
     */
    let response:any
    try {
      response = await fetch(url, options)
    } catch (e) {
      // If response is failed to load
      // Then we have connectivity problem
      throw new Error(
        'Unable to connect to the internet. Please check your internet connection.'
      )
    }
    /**
     * extract results from response by calling json()
     */
    let results = {}
    if (response && response.status !== 204) {
      /**
       * 204 means success response with no content
       */
      try {
        results = await response.json()
      } catch (error) {
        throw new Error(response, response.status)
      }
    }
    /**
     * on error throw error with message and status
     */
    if (response.status >= 400) {
      throw new Error(response, response.status)
    }
    /**
     * if successful response then return data with status
     */
    return results
  }

  /**
   * @description Makes get call for the provided URL and returns data if resolved successfully
   * @param {String} url
   */
  getData = async (url: string) => {
    
    const results = await this.sendRequest(url, {})
    return results
  }

  /**
   * @description makes PUT call with the body and url provided
   * @param {String} url
   * @param {Object} body
   */
  putData = async (url: string, body: object) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(body),
    }
    const results = await this.sendRequest(url, options)
    return results
  }

  /**
   * @description makes POST call with the body and url provided
   * @param {String} url
   * @param {Object} body
   */
  postData = async (url: string, body: object) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }
    const results = await this.sendRequest(url, options)
    return results
  }

  /**
   * @description makes DELETE call with the body and url provided
   * @param {String} url
   * @param {Object} body
   */
  deleteData = async (url: string, body: object) => {
    const options = {
      method: 'DELETE',
      body: JSON.stringify(body),
    }
    const results = await this.sendRequest(url, options)
    return results
  }
}

export const createFetcher = () => Fetcher.getInstance()
