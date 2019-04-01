import decode from 'jwt-decode';
export default class AuthService {

    // Initializing important variables
    constructor(domain) {
        this.domain = 'http://ec2-54-174-154-58.compute-1.amazonaws.com:8080/api' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.signup= this.signup.bind(this)
        this.getData = this.getData.bind(this)
        this.updateCourse = this.updateCourse.bind(this)
    }
    deleteCourse(course_id, course_name){
        return this.fetch(`${this.domain}/courses/${course_id}`,{
            method:'DELETE'
        }).then(res => {
            console.log(course_name + 'deleted')
            return Promise.resolve(res);
        })
    }
    addCourse(course_name, start_term, end_term, description){
        return this.fetch(`${this.domain}/courses`, {
            method: 'POST',
            body: JSON.stringify({
                course_name,
                start_term,
                end_term,
                description
            })
        }).then(res => {
            console.log(course_name +' added')
            return Promise.resolve(res);
        })
    }
    updateCourse(course_id, course_name, start_term, end_term, description){
        return this.fetch(`${this.domain}/courses/${course_id}` , {
            method: 'PUT',
            body: JSON.stringify({
                course_name,
                start_term,
                end_term,
                description,
            })
        }).then(res => {
            console.log(course_name + "updated")
            return Promise.resolve(res);
        })
    }
    signup(password,email,firstname,lastname,school,role){
        return this.fetch(`${this.domain}/signup`, {
            method: 'POST',
            body: JSON.stringify({
                password,
                email,
                firstname,
                lastname,
                school,
                role
            })
        }).then(res => {
            console.log('signed up')
            return Promise.resolve(res);
        })
    }


    login(email, password) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            console.log('logged in')
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getData() {
        {/* Using jwt-decode npm package to decode the token
        //return decode(this.getToken());*/}
        return this.fetch(`${this.domain}/courses`, {
            method: 'GET',
        }).then(res => {
            return (res); 
        }).catch(err =>{
            console.log(err.message)

        })
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
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
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            console.log(response)
            error.response = response
            throw error
        }
    }
}