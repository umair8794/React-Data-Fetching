import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {

  apiKey = "sKWma0Fr0gk5wa65HWRFYRJy4EzhW57A";
  constructor() {
    super();
    this.state = {
        gifs: [],
        loading: true
    };
  }

  componentDidMount() {
    this.callApi(`http://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}`);
  }

  callApi(url) {
    axios.get(url)
    .then(response => {
        this.setState({
            gifs: response.data.data,
            loading: false
        });
    })
    .catch(error => {
        console.log('Error fetching and parsing data', error);
    });
  }

  handleSearch = (query) => {
    this.callApi(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=${this.apiKey}`);
  }

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.handleSearch} />
          </div>
        </div>
        <div className="main-content">
          {
              (this.state.loading)
              ? <p>Loading...</p>
              : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}
