import React from 'react';

import { Card, CardImg, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom';

class BreedList extends React.Component {    

    render() {
        if (this.props.cats.length > 0) {
            const catListing = this.props.cats.map((cat) => {
                return (
                    <div className="col-md-3 col-sm-6 col-12" key={cat.id}>
                        <Card>
                            <CardImg src={cat.url} />
                            <CardBody>
                                <Link to={`/${cat.id}`} className="btn btn-primary btn-block">View Details</Link>
                            </CardBody>
                        </Card>
                    </div>
                );
            });
            return catListing;
        } else {
            return (
                <div className="col-12 no-cats">No cats available</div>
            );
        }
    }
}

export default BreedList;