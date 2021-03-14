import { Component } from 'react';
import OfferItem from "./OfferItem";
import * as offerServices from '../../services/offerServices'

class Offers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offers: []
        }
    }
    
    componentDidMount() {
        offerServices.getAll()
            .then(offers => {
                this.setState({ offers })
            });
    }

    render() {
        console.log(this.state.offers);
        return (
            this.state.offers.map(x => 
                <OfferItem
                    key={x._id}
                    offerName={x.offerName}
                    offerType={x.offerType}
                    description={x.description}
                    imageUrl={x.imageUrl}
                    price={x.price}
                    company={x.company.username}
                />
                )
          
        );
    }
}

export default Offers;