import React from 'react';
import queryString from 'query-string';


import thecat from '../api/thecat';
import BreedList from './BreedList';

import { Label, Input, Button } from 'reactstrap';



class Home extends React.Component {

    state = {
        breeds: [],
        selectedBreed: '',
        cats: [],
        totalCatsInBreed: 0,
        currentPage: 1,
        has_more: true,
        isFetching: false
    };

    componentDidMount() {                   
        this.populateBreed();
    }

    populateBreed = async () => {
        const response = await thecat.get('/breeds');         
       const params = queryString.parse(this.props.location.search)
        this.setState({
            breeds: response.data       
        });
        if (params.breed) {
            this.setState({
                isFetching: true
            });
            this.fetchCats(params.breed);
                   
        } 
    }

    onBreedSelectionChange = (event) => {        
        const breed = event.target.value;
        this.setState({
            isFetching: true
        });
        if (breed === '' || breed.length === 0) {
            this.setState({
                selectedBreed: '',
                cats: [],
                has_more: true,
                currentPage: 1
            });
            return;
        }
        this.fetchCats(breed);

        
       
    }

    fetchCats = async (breed) => {
        const response = await thecat.get('/images/search', {
            params: {
                page: 1,
                limit: 10,
                breed_id: breed    
            }
        });
        
        this.setState({            
            selectedBreed: breed,
            cats: response.data,
            has_more: true,
            totalCatsInBreed: parseInt(response.headers['pagination-count'], 10),
            isFetching: false
        });
    }

    renderLoadMoreBtn = () => {     

        if (this.state.isFetching) {
            return (
                <div className="col-md-3 col-sm-6 col-12">
                    <Button className="btn btn-success" name="loadMoreBtn" id="loadMoreBtn" disabled>Loading...</Button>
                </div>
            );
        }
        else if (this.state.selectedBreed === '') {
            return (
                <div className="col-md-3 col-sm-6 col-12">
                    <Button className="btn btn-success" disabled>Load more</Button>
                </div>
            );
        } else if (this.state.selectedBreed !== '' && this.state.has_more && !this.state.isFetching) {
            return (
                <div className="col-md-3 col-sm-6 col-12">
                    <Button className="btn btn-success" name="loadMoreBtn" id="loadMoreBtn" onClick={this.onloadMoreBtnClick}>Load more</Button>
                </div>
            );
        }
    };

    onloadMoreBtnClick =  (event) => {
        event.preventDefault();
        this.setState({
            isFetching: true
        });
        
        this.handleLoadMore();

    }

    handleLoadMore = async () => {
        let loadedCats = [];
        loadedCats = loadedCats.concat(this.state.cats);
        let loadMore = true;

        const page = this.state.currentPage + 1;
        const current_breed = this.state.selectedBreed

        const response = await thecat.get('/images/search', {
            params: {
                page: page,
                limit: 10,                
                breed_id: current_breed
            }
        });

        for(const fetchedCat of response.data) {
            let addNewCat = true;
            for(const cat of loadedCats) {
                
                if (fetchedCat.id === cat.id) {
                    addNewCat = false;
                    break;
                }
            }
            if (addNewCat) {
                loadedCats.push(fetchedCat);
            } 


        }
        if (loadedCats.length === this.state.totalCatsInBreed) {
            loadMore = false;
        }

        this.setState({
            currentPage: page,
            cats: loadedCats,
            has_more: loadMore,
            isFetching: false
        });
    }

    render() {        
        const breedOptions = this.state.breeds.map((breed) => {
            return <option key={breed.id} value={breed.id}>{breed.name}</option>
        });

        return (
            <div className="HomePage">
                <div className="container">
                    <h1>Cat Browser</h1>
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-12">
                            <div className="form-group">
                                <Label htmlFor="breedSelection">Breed</Label>
                                <Input
                                    type="select"
                                    name="breedSelection"
                                    id="breedSelection"
                                    value={this.state.selectedBreed}
                                    onChange={this.onBreedSelectionChange}>
                                        <option value=''>Select breed</option>
                                        {breedOptions}
                                </Input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <BreedList cats={this.state.cats} breed={this.state.selectedBreed}/>
                    </div>
                    <div className="row">
                        {this.renderLoadMoreBtn()}
                    </div> 
                </div>                
            </div>
        );
    }
}

export default Home;