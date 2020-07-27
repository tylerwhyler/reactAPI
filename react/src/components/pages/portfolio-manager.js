import React from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list"
import PortfolioForm from "../portfolio/portfolio-form"
import { faTheaterMasks } from "@fortawesome/free-solid-svg-icons";

export default class PortfolioManager extends React.Component {
    constructor() {
        super()

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        })
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        })
    }

    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true})
        .then(res => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })
            return res.data
        })
        .catch(err => {
            console.log("error from delete", err)
        })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        // TODO
        console.log(portfolioItem)
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleFormSubmissionError(error) {
        console.log(error)
    }

    getPortfolioItems() {
        axios.get("https://tyji.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true})
        .then(res => {
            this.setState({
                portfolioItems: [...res.data.portfolio_items]
            })
        }) .catch(err => {
            console.log("getportfoliotitems", err)
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        // console.log(this.state.portfolioItems.length > 0 ? this.state.portfolioItems[0].id : "NO portfolio Items")
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <h1>
                        <PortfolioSidebarList 
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItems}
                        handleEditClick={this.handleEditClick}
                        />
                    </h1>
                </div>
            </div>
        )
    }
}