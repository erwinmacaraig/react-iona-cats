import React from 'react';
import { Card, CardImg, CardBody, CardHeader } from 'reactstrap';

import thecat from '../api/thecat';
import {Link} from 'react-router-dom';

class CatDetails extends React.Component {

    state = {
        breed: '',
        id: '',
        description: '',
        imageUrl: '',
        name: '',
        origin: '',
        temperament: '',
        

    };

    constructor(props) {
        super(props);
        this.retrieveCatDetails();
    }

    retrieveCatDetails = async () => {
        const response = await thecat.get(`/images/${this.props.match.params.id}`);
        
        this.setState({
            breed: response.data.breeds[0]['id'],
            imageUrl: response.data.url,
            id: response.data.id,
            description: response.data.breeds[0]['description'],
            name: response.data.breeds[0]['name'],
            origin: response.data.breeds[0]['origin'],
            temperament: response.data.breeds[0]['temperament']
        });
    }

    render() {
        if (this.state.breed === '') {
            return (
                <div className="HomePage">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            );
        } else {
            return (
                <div className="HomePage">
                    <div className="container">
                        <Card>
                            <CardHeader>
                                <Link to={`/?breed=${this.state.breed}`} className="btn btn-primary">Back</Link>
                            </CardHeader>
                            <CardImg src={this.state.imageUrl} />
                            <CardBody>
                                <h4>{this.state.name}</h4>
                                <h5>Origin: {this.state.origin}</h5>
                                <h6>{this.state.temperament}</h6>
                                <p>{this.state.description}</p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                
            );
        }
        
        
    }
}

export default CatDetails;