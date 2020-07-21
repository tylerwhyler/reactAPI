import React from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list"
import PortfolioForm from "../portfolio/portfolio-form"

export default class PortfolioManager extends React.Component {
    constructor() {
        super()

        this.state = {
            portfolioItems: []
        }
        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this)
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this)
    }

    handleSuccessfulFormSubmission(portfolioItem) {
        // TODO
    }

    handleFormSubmissionError(error) {
        console.log(error)
    }

    getPortfolioItems() {
        axios.get("https://tyji.devcamp.space/portfolio/portfolio_items", { withCredentials: true})
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
                        handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                    />
                    <h1>

                    </h1>
                </div>
                <div className="right-column">
                    <h1>
                        <PortfolioSidebarList data={this.state.portfolioItems} />
                    </h1>
                </div>
            </div>
        )
    }
}