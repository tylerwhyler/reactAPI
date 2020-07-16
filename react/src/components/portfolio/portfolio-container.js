import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from 'axios';


export default class PortfolioContainer extends Component {
    
    constructor() {
        super();
        

        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: []
        }

       this.handleFilter = this.handleFilter.bind(this);
    }
    
    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            }) 
        })
    }

    getPortfolioItems() {
        axios.get("https://tyji.devcamp.space/portfolio/portfolio_items")
        .then(response => {
          this.setState({
            data: response.data.portfolio_items
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    portfolioItems() {
        return this.state.data.map(item => {
            console.log(item)
            return (
            <PortfolioItem key={item.id} item={item} />
            )
        });
    }

    componentDidMount() {
        this.getPortfolioItems();
    }


    handlePageTitleUpdate() {
        this.setState({
            pageTitle: 'Here is some information.'
        })
    }

    render() {

        if(this.state.isLoading) {
            return <div>Loading...</div>
        }
        return (
                <div className="portfolio-items-wrapper">
                    <button className="btn" onClick= {() => this.handleFilter('eCommerce')}>eCommerce</button>                
                    <button className="btn" onClick= {() => this.handleFilter('Scheduling')}>Scheduling</button>                
                    <button className="btn" onClick= {() => this.handleFilter('Enterprise')}>Enterprise</button>                
                    {this.portfolioItems()}
                </div>
            
        );
    }
}